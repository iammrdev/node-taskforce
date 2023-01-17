import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PerformersModule } from './performers/performers.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { JwtAccessModule } from '@taskforce/core';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: 'environments/.feedback.env',
      load: [jwtConfig],
    }),
    JwtAccessModule,
    PrismaModule,
    ReviewsModule,
    PerformersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
