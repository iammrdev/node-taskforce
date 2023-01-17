import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserInfo } from '@taskforce/core';
import { Review, UserRole } from '@taskforce/shared-types';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';
import { ReviewsEntity } from './reviews.entity';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async createReview(
    taskId: number,
    user: UserInfo,
    dto: CreateReviewDTO
  ): Promise<Review> {
    if (user.role !== UserRole.Customer) {
      throw new BadRequestException('invalid role');
    }
    const existedReview = await this.reviewsRepository.findByTask(taskId);

    if (existedReview.length > 0) {
      throw new BadRequestException('review exists');
    }

    const reviewsEntity = new ReviewsEntity({
      taskId,
      userId: user._id,
      text: dto.text,
      rating: dto.rating,
    });

    return this.reviewsRepository.create(reviewsEntity);
  }

  async deleteReview(id: number, userId: string): Promise<void> {
    const existedReview = await this.getReview(id);

    if (!existedReview) {
      throw new NotFoundException('review no found');
    }

    if (existedReview.userId !== userId) {
      throw new UnauthorizedException('forbidden');
    }

    this.reviewsRepository.delete(id);
  }

  async getReview(id: number): Promise<Review> {
    return this.reviewsRepository.findById(id);
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return this.reviewsRepository.findByUser(userId);
  }

  async updateReview(
    id: number,
    userId: string,
    dto: UpdateReviewDTO
  ): Promise<Review> {
    const existedReview = await this.getReview(id);

    if (!existedReview) {
      throw new NotFoundException('review no found');
    }

    if (existedReview.userId !== userId) {
      throw new UnauthorizedException('forbidden');
    }

    return this.reviewsRepository.update(
      id,
      new ReviewsEntity({
        text: dto.text,
        rating: dto.rating,
      })
    );
  }
}
