import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'Заголовок задания',
    example: 'Разработать калькулятор на JS',
  })
  @IsString({ message: 'title is required' })
  @Length(20, 50, { message: 'title min length is 20, max is 50' })
  public title: string;

  @ApiProperty({
    description: 'Описание задания',
    example:
      'Разработать калькулятор на JS. Необходим простой калькулятор с базовыми операциями (сложение, вычитание, умножение, деление). Результат предоставить ввиде ссылки на гитхаб-репозиторий',
  })
  @IsString({ message: 'description is required' })
  @Length(100, 1024, { message: 'description min length is 100, max is 1024' })
  public description: string;

  @ApiProperty({ description: 'Category id', example: 1 })
  @IsInt({ message: 'categoryId is required' })
  public categoryId: number;

  @ApiProperty({ description: 'Task price', example: 5000, required: false })
  @IsInt({ message: 'price is required' })
  @IsOptional()
  public price: number;

  @ApiProperty({
    description: 'Deadline date',
    example: '2023-03-12',
    required: false,
  })
  @IsDate({ message: 'Invalid date' })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  public deadline: Date;

  @ApiProperty({ description: 'Task image', example: 'task.png' })
  public image: string;

  @ApiProperty({
    description: 'Описание задания',
    example:
      'Разработать калькулятор на JS. Необходим простой калькулятор с базовыми операциями (сложение, вычитание, умножение, деление). Результат предоставить ввиде ссылки на гитхаб-репозиторий',
  })
  @IsString({ message: 'address is required' })
  @Length(10, 255, { message: 'min length is 10, max is 255' })
  public address: string;

  @ApiProperty({
    description: 'Task tags',
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @ArrayMaxSize(5, { message: 'tags must be valid' })
  @IsOptional()
  public tags: number[];
}
