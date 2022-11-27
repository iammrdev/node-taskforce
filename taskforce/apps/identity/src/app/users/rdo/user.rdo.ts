import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRDO {
  @ApiProperty({ description: 'The uniq user ID', example: '72' })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @Expose()
  public email: string;

  @ApiProperty({ description: 'User name', example: 'John' })
  @Expose()
  public name: string;

  @ApiProperty({ description: 'User surname', example: 'Doe' })
  @Expose()
  public surname: string;

  @ApiProperty({ description: 'User date birth (ISO)', example: '1981-03-12' })
  @Expose()
  public birthDate: string;

  @ApiProperty({ description: 'User avatar path', example: '/images/user.png' })
  @Expose()
  public avatar: string;
}
