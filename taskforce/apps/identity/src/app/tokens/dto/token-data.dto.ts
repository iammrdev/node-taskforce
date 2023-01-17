import { ApiProperty } from '@nestjs/swagger';
import { UserCity, UserRole } from '@taskforce/shared-types';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class TokenDataDTO {
  @ApiProperty({ description: 'User id', example: '63bdabe359be689d03fdf3e8' })
  @IsString()
  public _id: string

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @ApiProperty({ description: 'User role', example: 'Customer' })
  @IsString({ message: 'role is required' })
  @IsEnum(UserRole, { message: 'role must be valid' })
  public role: UserRole;

  @ApiProperty({ description: 'User city', example: 'Москва' })
  @IsString({ message: 'city is required' })
  @IsEnum(UserCity, { message: 'city must be valid' })
  public city: UserCity
}
