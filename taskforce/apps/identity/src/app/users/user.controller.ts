import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MongoIdValidationPipe } from '../pipes/mongoid-validation.pipe';
import { UserRDO } from './rdo/user.rdo';
import { UserService } from './user.service';

export class UserByEmailDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  public email: string;
}

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserRDO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not  found',
  })
  async getUser(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getUser(id);

    if (!existUser) {
      throw new NotFoundException('User not found', { description: 'NotFoundException' });
    }

    return fillObject(UserRDO, existUser);
  }

  @Post('get-by-email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not  found',
  })
  async getByEmail(
    @Body() dto: UserByEmailDTO
  ) {
    const existUser = await this.userService.getUserByEmail(dto.email);

    if (!existUser) {
      throw new NotFoundException('User not found', { description: 'NotFoundException' });
    }

    return fillObject(UserRDO, existUser);
  }
}
