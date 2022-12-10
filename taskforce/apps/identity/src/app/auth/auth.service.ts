import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { UserRole } from '@taskforce/shared-types';
import { UserRepositoryMemory } from '../users/user.repository.memory';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserSignInDTO } from './dto/user-signin.dto';
import {
  USER_EXISTS,
  USER_NOT_FOUND,
  USER_PASSWORD_WRONG,
} from './auth.constant';
import { UserEntity } from '../users/user.entity';
import databaseConfig from '../../config/database.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoryMemory: UserRepositoryMemory,
    private readonly configService: ConfigService,
    @Inject(databaseConfig.KEY)
    private readonly mongoConfig: ConfigType<typeof databaseConfig>
  ) {
    // Получаем настройки, используюя точечную нотацию
    console.log(configService.get<string>('database'));
    console.log({ mongoConfig });
  }

  async signup(dto: UserSignUpDTO) {
    const { email, name, surname, password, birthDate } = dto;
    const user = {
      _id: '',
      email,
      name,
      surname,
      role: UserRole.User,
      avatar: '',
      birthDate: dayjs(birthDate).toDate(),
      passwordHash: '',
    };

    const existUser = await this.userRepositoryMemory.findByEmail(email);

    if (existUser) {
      throw new Error(USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);

    return this.userRepositoryMemory.create(userEntity);
  }

  async verifyUser(dto: UserSignInDTO) {
    const { email, password } = dto;
    const existUser = await this.userRepositoryMemory.findByEmail(email);

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
    return this.userRepositoryMemory.findById(id);
  }
}
