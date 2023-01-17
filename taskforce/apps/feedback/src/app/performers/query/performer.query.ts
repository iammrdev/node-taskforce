import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PerformerQuery {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  public failedTasks: number;
}
