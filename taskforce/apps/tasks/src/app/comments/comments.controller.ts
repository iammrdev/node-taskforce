import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment created',
  })
  async createComment(@Param('taskId') rawTaskId: string, @Body() dto: CreateCommentDTO) {
    const taskId = parseInt(rawTaskId, 10);

    return this.commentsService.createComment({ taskId, ...dto });
  }


  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list',
    type: CommentRDO,
  })
  async getComments(@Param('taskId') rawTaskId: string) {
    const taskId = parseInt(rawTaskId, 10);
    const comments = this.commentsService.getComments(taskId);

    return fillObject(CommentRDO, comments);
  }

  @Put(':commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment updated',
  })
  async updateComment(
    @Param('taskId') rawTaskId: string,
    @Param('commentId') rawCommentId: string,
    @Body() dto: UpdateCommentDTO
  ) {
    const commentId = parseInt(rawCommentId, 10);
    const taskId = parseInt(rawTaskId, 10);
    const updatedComment = this.commentsService.updateComment(commentId, { ...dto, taskId });

    return fillObject(CommentRDO, updatedComment);
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('commentId') rawCommentId: string,) {
    const commentId = parseInt(rawCommentId, 10);

    this.commentsService.deleteComment(commentId);
  }
}
