import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { UserValidationError } from '../user.constants';


export class UserUpdateAvatarDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: UserValidationError.EmailNotValid })
  public email: string;

  @ApiProperty({ description: 'User avatar', example: 'user.png' })
  public avatar: string;
}
