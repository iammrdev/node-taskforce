import { Injectable } from '@nestjs/common';
import { UserRepositoryMemory } from './user.repository.memory';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryMemory: UserRepositoryMemory) {}

  async getUser(id: string) {
    return this.userRepositoryMemory.findById(id);
  }
}
