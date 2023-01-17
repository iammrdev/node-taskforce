import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';

const moduleOptions = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('jwt.access.secret'),
    signOptions: {
      expiresIn: configService.get('jwt.access.expiresIn'),
      algorithm: configService.get('jwt.access.algorithm'),
    },
  };
};

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: moduleOptions,
    }),
  ],
  exports: ['JwtAccessService'],
  providers: [
    { provide: 'JwtAccessService', useExisting: JwtService },
    JwtAccessTokenStrategy,
  ],
})
export class JwtAccessModule { }
