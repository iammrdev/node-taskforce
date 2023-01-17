import { Task } from '@taskforce/shared-types';
import { IsNotEmpty } from 'class-validator';
import { NAME_IS_EMPTY, USER_ID_IS_EMPTY } from '../email-subscriber.constants';

export class NotifySubscriberDTO {
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  subscriberId: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  tasks: Task[];
}
