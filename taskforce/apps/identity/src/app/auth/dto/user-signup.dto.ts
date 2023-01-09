import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString } from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constants';

export class UserSignUpDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({ description: 'User date birth (ISO)', example: '1981-03-12' })
  @IsISO8601({ message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public birthDate: string;

  @ApiProperty({ description: 'User name', example: 'John' })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'User surname', example: 'Doe' })
  @IsString()
  public surname: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  @IsString()
  public password: string;
}
