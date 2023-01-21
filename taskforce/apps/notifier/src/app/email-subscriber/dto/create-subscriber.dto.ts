import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberValidationError } from '../email-subscriber.constants';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberValidationError.EmailNotValid })
  email: string;

  @IsNotEmpty({ message: SubscriberValidationError.NameIsEmpty })
  name: string;

  @IsNotEmpty({ message: SubscriberValidationError.SurnameIsEmpty })
  surname: string;

  @IsNotEmpty({ message: SubscriberValidationError.UserIdIsEmpty })
  userId: string;
}
