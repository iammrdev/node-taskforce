import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  exports: [UserRepository],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
