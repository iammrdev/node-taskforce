import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  public email: string;

  @ApiProperty({ description: 'User date birth (ISO)', example: '1981-03-12' })
  public birthDate: string;

  @ApiProperty({ description: 'User name', example: 'John' })
  public name: string;

  @ApiProperty({ description: 'User surname', example: 'Doe' })
  public surname: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  public password: string;
}
