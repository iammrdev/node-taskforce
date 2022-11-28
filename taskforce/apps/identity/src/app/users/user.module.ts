import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryMemory } from './user.repository.memory';
import { UserService } from './user.service';

@Module({
  exports: [UserRepositoryMemory],
  controllers: [UserController],
  providers: [UserService, UserRepositoryMemory],
})
export class UserModule {}
