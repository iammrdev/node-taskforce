import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt.access', () => ({
  secret: process.env.JWT_SECRET,
}));
