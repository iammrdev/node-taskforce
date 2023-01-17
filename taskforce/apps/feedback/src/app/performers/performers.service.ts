import { Injectable } from '@nestjs/common';
import { Review } from '@taskforce/shared-types';

@Injectable()
export class PerformersService {
  async calculateRatingByReviews(
    reviews: Review[],
    failedTasks: number
  ): Promise<number> {
    const ratingSum = reviews.reduce((acc, item) => acc + item.rating, 0);

    return ratingSum / (reviews.length + failedTasks);
  }
}
