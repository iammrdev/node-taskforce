import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'invalid mongo id', async: false })
export class MongoIdValidator implements ValidatorConstraintInterface {
  validate(id: string) {
    return Types.ObjectId.isValid(id);
  }
}
