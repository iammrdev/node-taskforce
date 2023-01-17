import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Tag } from '@taskforce/shared-types';
import { CreateTagDTO } from './dto/create-tag.dto';
import { TagsEntity } from './tags.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async createTag(dto: CreateTagDTO): Promise<Tag> {
    const existedTag = await this.tagsRepository.findByTitle(dto.title);

    if (existedTag) {
      throw new BadRequestException('Tag is existed');
    }

    const tagsEntity = new TagsEntity(dto);
    return this.tagsRepository.create(tagsEntity);
  }

  async deleteTag(id: number): Promise<void> {
    this.tagsRepository.delete(id);
  }

  async getTag(id: number): Promise<Tag> {
    return this.tagsRepository.findById(id);
  }

  async getTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async updateTag(id: number, dto: CreateTagDTO): Promise<Tag> {
    return this.tagsRepository.update(id, new TagsEntity(dto));
  }
}
