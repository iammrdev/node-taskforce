import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TasksModule, CommentsModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
