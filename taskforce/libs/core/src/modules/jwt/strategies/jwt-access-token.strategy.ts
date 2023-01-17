import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@taskforce/shared-types';
import { UserInfo } from '../../../lib/pipes';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt.access'
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.access.secret'),
    });
  }

  async validate({ sub, email, role, city }: JwtPayload): Promise<UserInfo> {
    return { email, _id: sub, role, city };
  }
}
