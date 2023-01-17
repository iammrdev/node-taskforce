import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  fillObject,
  JwtAccessTokenGuard,
  UserInfo,
  UserInfoPipe,
} from '@taskforce/core';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';
import { ReviewRDO } from './rdo/review.rdo';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('tasks/:taskId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Review created' })
  @UseGuards(JwtAccessTokenGuard)
  async createReview(
    @UserInfoPipe() user: UserInfo,
    @Param('taskId') taskId: number,
    @Body() dto: CreateReviewDTO
  ) {
    return this.reviewsService.createReview(taskId, user, dto);
  }

  @Patch(':reviewId')
  @ApiResponse({ status: HttpStatus.OK, description: 'Review updated' })
  async updateReview(
    @UserInfoPipe() user: UserInfo,
    @Param('reviewId') reviewId: number,
    @Body() dto: UpdateReviewDTO
  ) {
    const updatedReview = this.reviewsService.updateReview(
      reviewId,
      user._id,
      dto
    );

    return fillObject(ReviewRDO, updatedReview);
  }

  @Delete(':reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(
    @UserInfoPipe() user: UserInfo,
    @Param('reviewId') reviewId: number
  ) {
    return this.reviewsService.deleteReview(reviewId, user._id);
  }
}
