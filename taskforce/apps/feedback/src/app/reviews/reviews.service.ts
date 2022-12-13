import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  async getReviews() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return [];
  }

  async createReview() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }

  async updateReview(reviewId: string) {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }
}
