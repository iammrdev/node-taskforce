import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  async getComments(taskId: string) {
    return {
      status: 'ok',
      item: {
        taskId,
      },
    };
  }

  async createComment(taskId: string) {
    return {
      status: 'ok',
      item: {
        taskId,
      },
    };
  }

  async updateComment(taskId: string, commentId: string) {
    return {
      status: 'ok',
      item: {
        taskId,
        commentId,
      },
    };
  }
}
