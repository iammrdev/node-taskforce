import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  fillObject,
  JwtAccessTokenGuard,
  MongoIdValidationPipe,
  UserInfoPipe,
  UserInfo,
} from '@taskforce/core';
import { UserSignedRDO } from '../auth/rdo/user-signed.rdo';
import { UserUpdatePasswordDTO } from './dto/user-update-password.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserRDO } from './rdo/user.rdo';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserRDO,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not  found' })
  async getUser(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.userService.getUserById(id);

    return fillObject(UserRDO, user);
  }

  @ApiBody({ type: UserUpdateDTO, description: 'Update user data' })
  @ApiResponse({
    type: UserSignedRDO,
    status: HttpStatus.OK,
    description: 'User data has been successfully updated',
  })
  @Patch()
  @UseGuards(JwtAccessTokenGuard)
  public async updateUserData(
    @UserInfoPipe() user: UserInfo,
    @Body() dto: UserUpdateDTO
  ) {
    const updatedUser = await this.userService.update(user._id, dto);

    return fillObject(UserRDO, updatedUser);
  }

  @ApiBody({ type: UserUpdateDTO, description: 'Update user password' })
  @ApiResponse({
    type: UserSignedRDO,
    status: HttpStatus.OK,
    description: 'User password has been successfully updated',
  })
  @Patch('password')
  @UseGuards(JwtAccessTokenGuard)
  public async updateUserPassword(
    @UserInfoPipe() user: UserInfo,
    @Body() dto: UserUpdatePasswordDTO
  ) {
    const updatedUser = await this.userService.updatePassword(user._id, dto);

    return fillObject(UserRDO, updatedUser);
  }

  @ApiBody({ type: UserUpdateDTO, description: 'Upload user avatar' })
  @ApiResponse({
    type: UserSignedRDO,
    status: HttpStatus.OK,
    description: 'User avatar has been successfully uploaded',
  })
  @Post('avatars')
  @UseGuards(JwtAccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadUserAvatar(
    @UserInfoPipe() user: UserInfo,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png)$/ }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const imagePath = `http://${process.env.HOST}:${process.env.PORT}/aws/${file.filename}`;
    const updatedUser = await this.userService.update(user._id, {
      avatar: imagePath,
    });

    return fillObject(UserRDO, updatedUser);
  }
}
