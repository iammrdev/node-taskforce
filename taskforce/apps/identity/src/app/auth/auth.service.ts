import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { UserRole } from '@taskforce/shared-types';
import { UserRepository } from '../users/user.repository';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserSignInDTO } from './dto/user-signin.dto';
import {
  USER_EXISTS,
  USER_NOT_FOUND,
  USER_PASSWORD_WRONG,
} from './auth.constant';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }

  async signup(dto: UserSignUpDTO) {
    const { email, name, surname, password, birthDate } = dto;
    const user = {
      email,
      name,
      surname,
      role: UserRole.User,
      avatar: '',
      birthDate: dayjs(birthDate).toDate(),
      passwordHash: '',
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new Error(USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);

    return this.userRepository.create(userEntity);
  }

  async verifyUser(dto: UserSignInDTO) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);

    if (!(await userEntity.comparePassword(password))) {
      throw new Error(USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
