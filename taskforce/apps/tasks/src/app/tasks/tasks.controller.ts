import { Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created',
  })
  async createTask() {
    return this.taskService.createTask();
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks list',
  })
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task found',
  })
  async getTask(@Param('taskId') taskId: string) {
    return this.taskService.getTask(taskId);
  }

  @Put(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task found',
  })
  async updateTask(@Param('taskId') taskId: string) {
    return this.taskService.getTask(taskId);
  }
}
