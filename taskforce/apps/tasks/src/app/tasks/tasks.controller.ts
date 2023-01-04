import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created',
  })
  async createTask(@Body() dto: CreateTaskDTO) {
    return this.taskService.createTask(dto);
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
  async getTask(@Param('taskId') rawTaskId: string) {
    const taskId = parseInt(rawTaskId, 10);

    return this.taskService.getTask(taskId);
  }

  @Patch(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task updated',
  })
  async updateTask(@Param('taskId') rawTaskId: string, @Body() dto: UpdateTaskDTO) {
    const taskId = parseInt(rawTaskId, 10);

    return this.taskService.updateTask(taskId, dto);
  }
}
