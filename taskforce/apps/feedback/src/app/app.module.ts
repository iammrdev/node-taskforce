import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ReviewsModule],
  controllers: [AppController, ReviewsController],
  providers: [AppService],
})
export class AppModule {}
