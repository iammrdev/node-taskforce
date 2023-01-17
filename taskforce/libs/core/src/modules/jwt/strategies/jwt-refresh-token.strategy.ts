import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@taskforce/shared-types';
import { UserInfo } from '@taskforce/core';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt.refresh'
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refresh.secret'),
      passReqToCallback: true,
    });
  }

  async validate({ sub, email, role, city }: JwtPayload): Promise<UserInfo> {
    return { email, _id: sub, role, city };
  }
}
