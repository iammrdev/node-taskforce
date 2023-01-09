import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CommandEvent, User, UserRole } from '@taskforce/shared-types';
import { UserRepository } from '../users/user.repository';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserSignInDTO } from './dto/user-signin.dto';
import {
  RABBITMQ_SERVICE,
  USER_EXISTS,
  USER_NOT_FOUND,
  USER_PASSWORD_WRONG,
} from './auth.constants';
import { UserEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    // @tutor: можно ли внедрить другим способом?
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) { }

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
      throw new BadRequestException(USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);

    const createdUser = await this.userRepository.create(userEntity);

    // @tutor: есть ли какой-то стандарт сообщений? каких принципов стоит придерживаться?
    // @tutor: основы RabbitMQ на примере management панели
    // @tutor: почему не используем exchange?
    this.rabbitClient.emit(
      // @tutor: cmd это стандарт?
      { cmd: CommandEvent.AddSubscriber },
      {
        email: createdUser.email,
        name: createdUser.name,
        surname: createdUser.surname,
        userId: createdUser._id.toString(),
      }
    );

    return createdUser;
  }

  async signin(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      surname: user.surname
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyUser(dto: UserSignInDTO) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);

    if (!(await userEntity.comparePassword(password))) {
      throw new UnauthorizedException(USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
