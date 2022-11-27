import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  async getTags() {
    return {
      status: 'ok',
      item: {},
    };
  }

  async createTag() {
    return {
      status: 'ok',
      item: {},
    };
  }

  async updateTag(tagId: string) {
    return {
      status: 'ok',
      item: {
        tagId,
      },
    };
  }
}
