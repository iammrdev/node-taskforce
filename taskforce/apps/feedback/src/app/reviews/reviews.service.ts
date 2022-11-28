import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  async getReviews() {
    return {
      status: 'ok',
      items: [],
    };
  }

  async createReview() {
    return {
      status: 'ok',
      item: {},
    };
  }

  async updateReview(reviewId: string) {
    return {
      status: 'ok',
      item: {
        reviewId,
      },
    };
  }
}
