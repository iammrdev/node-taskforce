import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessTokenGuard, UserInfo, UserInfoPipe } from '@taskforce/core';
import { CommandEvent, Subscriber, UserRole } from '@taskforce/shared-types';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskInProgressDTO } from './dto/task-in-progress.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskMyQuery } from './query/task-my.query';
import { TaskQuery } from './query/task.query copy';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Task created' })
  @UseGuards(JwtAccessTokenGuard)
  async createTask(
    @UserInfoPipe(UserRole.Customer) user: UserInfo,
    @Body() dto: CreateTaskDTO
  ) {
    return this.taskService.createTask(user, dto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Tasks list' })
  @UseGuards(JwtAccessTokenGuard)
  async getTasks(
    @UserInfoPipe(UserRole.Performer) user: UserInfo,
    @Query() query: TaskQuery
  ) {
    return this.taskService.getTasks(query);
  }

  @Get('my')
  @ApiResponse({ status: HttpStatus.OK, description: 'My tasks list' })
  @UseGuards(JwtAccessTokenGuard)
  async getMyTasks(
    @UserInfoPipe() user: UserInfo,
    @Query() query: TaskMyQuery
  ) {
    return this.taskService.getTasksByUser(user, query);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Notify with new tasks' })
  @EventPattern({ cmd: CommandEvent.NotifyTasks })
  async notify(subscriber: Subscriber) {
    return this.taskService.notifyUser(subscriber);
  }

  @Get(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task found',
  })
  async getTask(@Param('taskId') taskId: number) {
    return this.taskService.getTask(taskId);
  }

  @Patch(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task updated',
  })
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() dto: UpdateTaskDTO
  ) {
    return this.taskService.updateTask(taskId, dto);
  }

  @Post(':taskId/response')
  @ApiResponse({ status: HttpStatus.OK, description: 'Response on task' })
  @UseGuards(JwtAccessTokenGuard)
  async takeResponse(
    @UserInfoPipe(UserRole.Performer) user: UserInfo,
    @Param('taskId') taskId: number
  ) {
    return this.taskService.takeResponse(taskId, user._id);
  }

  @Post(':taskId/cancel')
  @ApiResponse({ status: HttpStatus.OK, description: 'Cancel task' })
  @UseGuards(JwtAccessTokenGuard)
  async cancelTask(
    @UserInfoPipe() user: UserInfo,
    @Param('taskId') taskId: number
  ) {
    return this.taskService.cancelTask(taskId, user._id);
  }

  @Post(':taskId/progress')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Switch task to progress',
  })
  @UseGuards(JwtAccessTokenGuard)
  async switchTaskToProgress(
    @UserInfoPipe() user: UserInfo,
    @Param('taskId') taskId: number,
    @Body() dto: TaskInProgressDTO
  ) {
    return this.taskService.switchTaskToProgress(taskId, user._id, dto);
  }

  @Post(':taskId/done')
  @ApiResponse({ status: HttpStatus.OK, description: 'Switch task to done' })
  @UseGuards(JwtAccessTokenGuard)
  async switchTaskToDone(
    @UserInfoPipe() user: UserInfo,
    @Param('taskId') taskId: number
  ) {
    return this.taskService.switchTaskToDone(taskId, user._id);
  }

  @Post(':taskId/failed')
  @ApiResponse({ status: HttpStatus.OK, description: 'Switch task to failed' })
  @UseGuards(JwtAccessTokenGuard)
  async switchTaskToFailed(
    @UserInfoPipe() user: UserInfo,
    @Param('taskId') taskId: number
  ) {
    return this.taskService.switchTaskToFailed(taskId, user._id);
  }

  @Post(':taskId/image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAccessTokenGuard)
  public async uploadFile(
    @Param('taskId') taskId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png)$/ }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.taskService.updateImage(taskId, { image: file.filename });
  }
}
