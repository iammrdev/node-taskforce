import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  async getComments(taskId: string) {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return [];
  }

  async createComment(taskId: string) {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }

  async updateComment(taskId: string, commentId: string) {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }
}
