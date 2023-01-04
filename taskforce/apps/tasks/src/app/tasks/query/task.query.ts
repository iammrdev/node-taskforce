import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TASK_COUNT_LIMIT } from '../tasks.constants';
import { ApiProperty } from '@nestjs/swagger';

export class TaskQuery {
  @ApiProperty()
  @Transform(({ value }) => Number(value) || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_TASK_COUNT_LIMIT;

  @ApiProperty()
  @Transform(({ value }) => value.split(',').map((tagId) => Number(tagId)))
  @IsArray()
  @IsOptional()
  public tags: number[];

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public category: number;

  @ApiProperty()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
