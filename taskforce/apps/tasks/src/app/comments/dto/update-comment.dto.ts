import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCommentDTO {
  @ApiProperty({ description: 'Comment text', example: 'Thank you!' })
  @IsString({ message: 'text is required' })
  @Length(10, 300, { message: 'min length is 10, max is 300' })
  public text: string;
}
