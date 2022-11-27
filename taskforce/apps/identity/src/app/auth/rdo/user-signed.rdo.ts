import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignedRDO {
  @ApiProperty({ description: 'The uniq user ID', example: '13' })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @Expose()
  public email: string;

  @ApiProperty({ description: 'Access token', example: 'JWT' })
  @Expose()
  public accessToken: string;
}
