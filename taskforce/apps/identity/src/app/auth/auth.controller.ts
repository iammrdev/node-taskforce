import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { AuthService } from './auth.service';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserSignInDTO } from './dto/user-signin.dto';
import { UserSignedRDO } from './rdo/user-signed.rdo';
import { UserRDO } from '../users/rdo/user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created',
    type: UserRDO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user data',
  })
  async signup(@Body() dto: UserSignUpDTO) {
    const newUser = await this.authService.signup(dto);

    return fillObject(UserRDO, newUser);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged',
    type: UserSignedRDO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong',
  })
  async signin(@Body() dto: UserSignInDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(UserSignedRDO, verifiedUser);
  }
}
