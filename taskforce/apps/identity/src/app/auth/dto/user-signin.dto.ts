import { ApiProperty } from '@nestjs/swagger';

export class UserSignInDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  public email: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  public password: string;
}
