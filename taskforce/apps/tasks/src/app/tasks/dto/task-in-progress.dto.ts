import { MongoIdValidator } from '@taskforce/core';
import { IsString, Validate } from 'class-validator';

export class TaskInProgressDTO {
  @IsString({ message: 'title is required' })
  @Validate(MongoIdValidator, { message: 'invalid performer id' })
  public performerId: string;
}
