import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from '../reviews/reviews.service';
import { PerformersService } from './performers.service';
import { PerformerQuery } from './query/performer.query';

@ApiTags('performers')
@Controller('performers')
export class PerformersController {
  constructor(
    private readonly performersService: PerformersService,
    private readonly reviewsService: ReviewsService
  ) {}

  @Get(':userId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rating by performer',
    type: 'number',
  })
  async getRatingByPerformer(
    @Param('userId') userId: string,
    @Query() query: PerformerQuery
  ) {
    const reviews = await this.reviewsService.getReviewsByUser(userId);
    const rating = await this.performersService.calculateRatingByReviews(
      reviews,
      query.failedTasks
    );

    return { rating };
  }
}
