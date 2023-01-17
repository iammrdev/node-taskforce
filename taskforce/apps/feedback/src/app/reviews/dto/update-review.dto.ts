import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min, Max } from 'class-validator';

export class UpdateReviewDTO {
  @ApiProperty({ description: 'Review text', example: 'Thank you!' })
  @IsString({ message: 'text is required' })
  @Length(50, 500, { message: 'min length is 50, max is 500' })
  public text: string;

  @ApiProperty({ description: 'Rating', example: 5 })
  @IsInt({ message: 'rating is required' })
  @Min(1, { message: 'rating min value - 1' })
  @Max(5, { message: 'rating max value - 5' })
  public rating: number;
}
