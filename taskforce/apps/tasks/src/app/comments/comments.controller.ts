import { Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly tasksService: CommentsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created',
  })
  async createComment(@Param('taskId') taskId: string) {
    return this.tasksService.createComment(taskId);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list',
  })
  async getComments(@Param('taskId') taskId: string) {
    return this.tasksService.getComments(taskId);
  }

  @Put(':commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment updated',
  })
  async updateTask(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string
  ) {
    return this.tasksService.updateComment(taskId, commentId);
  }
}
