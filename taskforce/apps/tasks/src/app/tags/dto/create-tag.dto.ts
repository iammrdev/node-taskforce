import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'invalid mongo id', async: false })
export class TagTitleValidator implements ValidatorConstraintInterface {
  validate(tag: string) {
    const tagWordsCount = tag.split(' ').length;

    if (tagWordsCount !== 1) {
      return false;
    }

    return /[а-яa-z]/.test(tag[0]);
  }
}

export class CreateTagDTO {
  @ApiProperty({ required: false })
  @IsString({ message: 'title is required' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Length(3, 10, { message: 'min length is 3, max is 10' })
  @Validate(TagTitleValidator, { message: 'invalid tag title' })
  public title: string;
}
