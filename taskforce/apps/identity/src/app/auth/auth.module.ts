import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtModuleOptions } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './auth.constants';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // @tutor: почему одни модули просто импортируются, а другие через registerAsync?
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtModuleOptions
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        inject: [ConfigService],
        useFactory: getRabbitMqConfig,
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
