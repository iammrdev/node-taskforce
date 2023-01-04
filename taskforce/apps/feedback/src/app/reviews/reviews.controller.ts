import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';
import { ReviewRDO } from './rdo/review.rdo';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('tasks/:taskId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Review created',
  })
  async createReview(@Param('taskId') rawTaskId: string, @Body() dto: CreateReviewDTO) {
    const taskId = parseInt(rawTaskId, 10);

    return this.reviewsService.createReview({ taskId, ...dto });
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reviews list',
  })
  async getReviews(@Param('taskId') rawTaskId: string) {
    const taskId = parseInt(rawTaskId, 10);
    const Reviews = this.reviewsService.getReviews(taskId);

    return fillObject(ReviewRDO, Reviews);
  }

  @Patch(':reviewId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review updated',
  })
  async updateReview(
    @Param('taskId') rawTaskId: string,
    @Param('reviewId') rawReviewId: string,
    @Body() dto: UpdateReviewDTO
  ) {
    const reviewId = parseInt(rawReviewId, 10);
    const taskId = parseInt(rawTaskId, 10);
    const updatedReview = this.reviewsService.updateReview(reviewId, { ...dto, taskId });

    return fillObject(ReviewRDO, updatedReview);
  }

  @Delete(':reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param('reviewId') rawReviewId: string,) {
    const reviewId = parseInt(rawReviewId, 10);

    this.reviewsService.deleteReview(reviewId);
  }
}
