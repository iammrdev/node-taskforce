import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  DEFAULT_SORT_DIRECTION,
  DEFAULT_COMMENTS_COUNT_LIMIT,
} from '../comments.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CommentsQuery {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value) || DEFAULT_COMMENTS_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_COMMENTS_COUNT_LIMIT;

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
