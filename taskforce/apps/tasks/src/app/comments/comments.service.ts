import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { CommentsEntity } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentsQuery } from './query/comments.query';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(
    taskId: number,
    userId: string,
    dto: CreateCommentDTO
  ): Promise<Comment> {
    const commentsEntity = new CommentsEntity({
      text: dto.text,
      userId,
      taskId,
    });
    return this.commentsRepository.create(commentsEntity);
  }

  async deleteComment(id: number, userId: string): Promise<void> {
    const existedComment = await this.getComment(id);

    if (!existedComment) {
      throw new NotFoundException('comment no found');
    }

    if (existedComment.userId !== userId) {
      throw new UnauthorizedException('forbidden');
    }

    this.commentsRepository.delete(id);
  }

  async getComment(id: number): Promise<Comment> {
    return this.commentsRepository.findById(id);
  }

  async getComments(taskId: number, query: CommentsQuery): Promise<Comment[]> {
    return this.commentsRepository.findByTask(taskId, query);
  }

  async updateComment(
    id: number,
    userId: string,
    dto: UpdateCommentDTO
  ): Promise<Comment> {
    const existedComment = await this.getComment(id);

    if (!existedComment) {
      throw new NotFoundException('comment no found');
    }

    if (existedComment.userId !== userId) {
      throw new UnauthorizedException('forbidden');
    }

    return this.commentsRepository.update(
      id,
      new CommentsEntity({ text: dto.text })
    );
  }
}
