import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

const moduleOptions = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('jwt.refresh.secret'),
    signOptions: {
      expiresIn: configService.get('jwt.refresh.expiresIn'),
      algorithm: configService.get('jwt.refresh.algorithm'),
    },
  };
};

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: moduleOptions,
    }),
  ],
  providers: [
    { provide: 'JwtRefreshService', useExisting: JwtService },
    JwtRefreshTokenStrategy,
  ],
  exports: ['JwtRefreshService'],
})
export class JwtRefreshModule { }
