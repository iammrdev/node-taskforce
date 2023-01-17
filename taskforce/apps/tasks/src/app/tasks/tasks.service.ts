import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfo } from '@taskforce/core';
import { CommandEvent, Subscriber, Task, TaskStatus } from '@taskforce/shared-types';
import { CommentsRepository } from '../comments/comments.repository';
import { TagsRepository } from '../tags/tags.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ImageDTO } from './dto/image-dto';
import { TaskInProgressDTO } from './dto/task-in-progress.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskMyQuery } from './query/task-my.query';
import { TaskQuery } from './query/task.query copy';
import { TasksEntity } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly commentsRepository: CommentsRepository,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy
  ) { }

  async createTask(user: UserInfo, dto: CreateTaskDTO) {
    const tags = await this.tagsRepository.find(dto.tags);

    const tagsEntity = new TasksEntity({
      ...dto,
      tags,
      responses: [],
      comments: [],
      status: TaskStatus.CREATED,
      city: user.city,
      userId: user._id,
    });

    return this.tasksRepository.create(tagsEntity);
  }

  async getTask(taskId: number) {
    return this.tasksRepository.findById(taskId);
  }

  async getTasks(query: TaskQuery) {
    return this.tasksRepository.find(query);
  }

  async getTasksByUser(user: UserInfo, query: TaskMyQuery) {
    return this.tasksRepository.findByUser(user, query);
  }

  async updateTask(id: number, dto: UpdateTaskDTO) {
    const task = await this.tasksRepository.findById(id);
    const tags = await this.tagsRepository.find(dto.tags);
    const comments = await this.commentsRepository.findByTask(id);
    const taskEntity = new TasksEntity({ ...task, ...dto, tags, comments });

    return this.tasksRepository.update(id, taskEntity);
  }

  async takeResponse(id: number, userId: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (task.status !== TaskStatus.CREATED) {
      throw new BadRequestException('invalid action');
    }

    if (task.responses.includes(userId)) {
      throw new BadRequestException('user has active response');
    }

    const taskEntity = new TasksEntity({
      ...task,
      responses: [...task.responses, userId],
    });

    return this.tasksRepository.update(id, taskEntity);
  }

  async cancelTask(id: number, userId: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('forbidden');
    }

    if (task.status !== TaskStatus.CREATED) {
      throw new BadRequestException('not valid change status');
    }

    const taskEntity = new TasksEntity({
      ...task,
      status: TaskStatus.CANCELLED,
    });

    return this.tasksRepository.update(id, taskEntity);
  }

  async switchTaskToProgress(
    id: number,
    userId: string,
    dto: TaskInProgressDTO
  ) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('forbidden');
    }

    const performerTasks = await this.tasksRepository.findByUser(
      { _id: dto.performerId },
      { status: TaskStatus.PROGRESS }
    );

    const responseIsValid = task.responses.includes(dto.performerId);

    if (
      task.status !== TaskStatus.CREATED ||
      !responseIsValid ||
      performerTasks.length > 0
    ) {
      throw new BadRequestException('not valid change status');
    }

    const taskEntity = new TasksEntity({
      ...task,
      status: TaskStatus.PROGRESS,
      performerId: dto.performerId,
    });

    return this.tasksRepository.update(id, taskEntity);
  }

  async switchTaskToDone(id: number, userId: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('forbidden');
    }

    if (task.status !== TaskStatus.PROGRESS) {
      throw new BadRequestException('not valid change status');
    }

    const taskEntity = new TasksEntity({
      ...task,
      status: TaskStatus.DONE,
    });

    return this.tasksRepository.update(id, taskEntity);
  }

  async switchTaskToFailed(id: number, userId: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (task.performerId !== userId) {
      throw new ForbiddenException('forbidden');
    }

    if (task.status !== TaskStatus.PROGRESS) {
      throw new BadRequestException('not valid change status');
    }

    const taskEntity = new TasksEntity({
      ...task,
      status: TaskStatus.FAILED,
    });

    return this.tasksRepository.update(id, taskEntity);
  }

  async updateImage(taskId: number, dto: ImageDTO): Promise<Task> {
    const imagePath = `http://${process.env.HOST}:${process.env.PORT}/aws/${dto.image}`;
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    const taskEntity = new TasksEntity({ ...task, image: imagePath });

    return this.tasksRepository.update(taskId, taskEntity);
  }

  async notifyUser(user: Subscriber) {
    const tasks = await this.tasksRepository.findAfterDate(new Date(user.notifiedDate));
    console.log({ user })
    this.rabbitClient.emit(
      { cmd: CommandEvent.NewTasks },
      { tasks, subscriberId: user._id }
    );

    return tasks;
  }
}
