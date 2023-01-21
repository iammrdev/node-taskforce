import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { UserValidationError } from '../user.constants';

export class UserUpdatePasswordDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: UserValidationError.EmailNotValid })
  public email: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  @IsString()
  @Length(6, 12, { message: UserValidationError.PasswordLength })
  public password: string;

  @ApiProperty({ description: 'New user password', example: '123456' })
  @IsString()
  @Length(6, 12, { message: UserValidationError.PasswordLength })
  public newPassword: string;
}
