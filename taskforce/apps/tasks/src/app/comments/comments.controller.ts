import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  fillObject,
  JwtAccessTokenGuard,
  UserInfo,
  UserInfoPipe,
} from '@taskforce/core';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentsQuery } from './query/comments.query';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created' })
  @UseGuards(JwtAccessTokenGuard)
  async createComment(
    @UserInfoPipe() user: UserInfo,
    @Param('taskId') taskId: number,
    @Body() dto: CreateCommentDTO
  ) {
    return this.commentsService.createComment(taskId, user._id, dto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list',
    type: CommentRDO,
  })
  async getComments(
    @Param('taskId') taskId: number,
    @Query() query: CommentsQuery
  ) {
    const comments = this.commentsService.getComments(taskId, query);

    return fillObject(CommentRDO, comments);
  }

  @Put(':commentId')
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment updated' })
  async updateComment(
    @UserInfoPipe() user: UserInfo,
    @Param('commentId') commentId: number,
    @Body() dto: UpdateCommentDTO
  ) {
    const updatedComment = this.commentsService.updateComment(
      commentId,
      user._id,
      dto
    );

    return fillObject(CommentRDO, updatedComment);
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessTokenGuard)
  async deleteComment(
    @Param('commentId') commentId: number,
    @UserInfoPipe() user: UserInfo
  ) {
    return this.commentsService.deleteComment(commentId, user._id);
  }
}
