import { Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Review created',
  })
  async createTag() {
    return this.reviewsService.createReview();
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reviews list',
  })
  async getTags() {
    return this.reviewsService.getReviews();
  }

  @Put(':reviewId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review updated',
  })
  async updateTag(@Param('reviewId') reviewId: string) {
    return this.reviewsService.updateReview(reviewId);
  }
}
