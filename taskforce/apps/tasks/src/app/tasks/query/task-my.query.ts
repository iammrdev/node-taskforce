import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';

export class TaskMyQuery {
  @ApiProperty({ required: false })
  @IsEnum(TaskStatus, { message: 'status must be valid' })
  @IsOptional()
  public status: TaskStatus;
}
