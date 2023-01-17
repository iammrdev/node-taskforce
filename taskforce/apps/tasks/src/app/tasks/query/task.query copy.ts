import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT, DEFAULT_TASK_COUNT_LIMIT } from '../tasks.constants';
import { ApiProperty } from '@nestjs/swagger';

export class TaskQuery {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value) || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_TASK_COUNT_LIMIT;

  @ApiProperty({ required: false })
  @Transform(({ value }) =>
    (typeof value === 'string' ? [value] : value).map((tagId) => Number(tagId))
  )
  @IsArray()
  @IsOptional()
  public tags?: number[];

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public category: number;

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsIn(['createdAt', 'comments', 'responses'])
  @IsOptional()
  public sort: 'createdAt' | 'comments' | 'responses' = DEFAULT_SORT;

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsIn(['Москва', 'Санкт-Петербург', 'Владивосток'])
  @IsOptional()
  public city: 'Москва' | 'Санкт-Петербург' | 'Владивосток';
}
