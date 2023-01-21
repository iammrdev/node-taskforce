import { Task } from '@taskforce/shared-types';
import { IsNotEmpty } from 'class-validator';
import { SubscriberValidationError } from '../email-subscriber.constants';

export class NotifySubscriberDTO {
  @IsNotEmpty({ message: SubscriberValidationError.UserIdIsEmpty })
  subscriberId: string;

  @IsNotEmpty({ message: SubscriberValidationError.NameIsEmpty })
  tasks: Task[];
}
