import { Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tag created',
  })
  async createTag() {
    return this.tagsService.createTag();
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags list',
  })
  async getTags() {
    return this.tagsService.getTags();
  }

  @Put(':tagId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag updated',
  })
  async updateTag(@Param('tagId') tagId: string) {
    return this.tagsService.updateTag(tagId);
  }
}
