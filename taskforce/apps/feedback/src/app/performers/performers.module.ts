import { Module } from '@nestjs/common';
import { ReviewsModule } from '../reviews/reviews.module';
import { ReviewsService } from '../reviews/reviews.service';
import { PerformersController } from './performers.controller';
import { PerformersService } from './performers.service';

@Module({
  imports: [ReviewsModule],
  controllers: [PerformersController],
  providers: [PerformersService, ReviewsService],
})
export class PerformersModule {}
