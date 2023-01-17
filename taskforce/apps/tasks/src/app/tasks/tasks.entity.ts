import {
  Tag,
  Comment,
  Task,
  TaskStatus,
  UserCity,
} from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class TasksEntity implements Entity<Task> {
  public id?: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public status: TaskStatus;
  public price: number;
  public image: string;
  public city: UserCity;
  public address: string;
  public tags: Tag[];
  public userId: string;
  public performerId: string;
  public comments?: Comment[];
  public responses?: string[];
  public createdAt: Date;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.categoryId = entity.categoryId;
    this.status = entity.status;
    this.price = entity.price;
    this.image = entity.image || '';
    this.city = entity.city;
    this.address = entity.address;
    this.tags = entity.tags || [];
    this.userId = entity.userId;
    this.performerId = entity.performerId;
    this.comments = entity.comments || [];
    this.responses = entity.responses || [];
    this.createdAt = new Date();
  }

  public toObject(): Task {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
      status: this.status,
      price: this.price,
      image: this.image,
      city: this.city,
      address: this.address,
      tags: this.tags,
      comments: this.comments,
      responses: this.responses,
      userId: this.userId,
      performerId: this.performerId,
      createdAt: this.createdAt,
    };
  }
}
