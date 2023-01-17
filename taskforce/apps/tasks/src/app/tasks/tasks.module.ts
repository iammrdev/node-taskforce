import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../../config/multer.config';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { CommentsModule } from '../comments/comments.module';
import { TagsModule } from '../tags/tags.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TagsModule,
    CommentsModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        inject: [ConfigService],
        useFactory: getRabbitMqConfig,
      }
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksRepository],
})
export class TasksModule { }
