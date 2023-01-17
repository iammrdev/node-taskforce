import { registerAs } from '@nestjs/config';

export const jwtAccessConfig = registerAs('jwt.access', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  algorithm: process.env.JWT_ALGORITHM,
}));


export const jwtRefreshConfig = registerAs('jwt.refresh', () => ({
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  algorithm: process.env.JWT_ALGORITHM,
}));
