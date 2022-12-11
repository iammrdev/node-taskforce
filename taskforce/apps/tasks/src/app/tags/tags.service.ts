import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  async getTags() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return [];
  }

  async createTag() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }

  async updateTag(tagId: string) {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }
}
