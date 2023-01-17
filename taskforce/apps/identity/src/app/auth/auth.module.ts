import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { TokensModule } from '../tokens/tokens.module';
import { JwtAccessModule, JwtRefreshModule } from '@taskforce/core';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtAccessModule,
    JwtRefreshModule,
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
