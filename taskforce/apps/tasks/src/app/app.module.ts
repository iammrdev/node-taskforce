import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAccessModule } from '@taskforce/core';
import { jwtConfig } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getStaticConfig, staticOptions } from '../config/static.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: 'environments/.tasks.env',
      load: [jwtConfig, rabbitMqOptions, staticOptions],
    }),
    ServeStaticModule.forRootAsync({
      useFactory: getStaticConfig,
      inject: [ConfigService],
    }),
    JwtAccessModule,
    PrismaModule,
    TasksModule,
    CommentsModule,
    TagsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
