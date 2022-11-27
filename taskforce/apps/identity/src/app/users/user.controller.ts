import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { UserRDO } from './rdo/user.rdo';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async show(@Param('id') id: string) {
    const existUser = await this.userService.getUser(id);
    return fillObject(UserRDO, existUser);
  }
}
