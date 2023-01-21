import { CRUDRepository } from '@taskforce/core';
import { TasksEntity } from './tasks.entity';
import { Task } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TaskMyQuery } from './query/task-my.query';
import { TaskQuery } from './query/task.query copy';

@Injectable()
export class TasksRepository
  implements CRUDRepository<TasksEntity, number, Task>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(entity: TasksEntity): Promise<Task> {
    const entityData = entity.toObject();

    const task = await this.prisma.task.create({
      data: {
        title: entityData.title,
        description: entityData.description,
        status: entityData.status,
        price: entityData.price,
        image: entityData.image,
        city: entityData.city,
        address: entityData.address,
        categoryId: entityData.categoryId,
        userId: entityData.userId,
        responses: entityData.responses,
        tags: {
          connect: entityData.tags.map(({ id }) => ({ id })),
        },
        comments: {
          connect: [],
        },
      },
      include: {
        category: true,
        tags: true,
        comments: true,
      },
    });

    return task as Task;
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  public async findById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: { id },
      include: {
        category: true,
        tags: true,
        comments: true,
      },
    });

    return task as Task | null;
  }

  public async find({
    limit,
    tags,
    category,
    page,
    city,
  }: TaskQuery): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        categoryId: category,
        city,
        tags: {
          some: {
            id: {
              in: tags,
            },
          },
        },
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
      orderBy: [{ title: 'desc' }],
      include: {
        category: true,
        tags: true,
        comments: true,
      },
    });

    return tasks as Task[];
  }

  public async findByUser(
    user: { _id: string; role?: string },
    { status }: TaskMyQuery
  ): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: user._id,
        status,
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        category: true,
        tags: true,
        comments: true,
      },
    });

    return tasks as Task[];
  }

  public async update(id: number, entity: TasksEntity): Promise<Task> {
    const entityData = entity.toObject();

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...entityData,
        id,
        comments: {
          connect: entityData.comments.map(({ id }) => ({ id })),
        },
        tags: {
          connect: entityData.tags.map(({ id }) => ({ id })),
        },
      },
      include: {
        category: true,
        tags: true,
        comments: true,
      },
    });

    return task as Task;
  }

  public async findAfterDate(date: Date): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        createdAt: {
          gt: date,
        },
      },
    });

    return tasks as Task[];
  }
}
