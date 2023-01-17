import { Tag } from './tag';
import { Comment } from './comment';
import { UserCity } from './user';

export enum TaskStatus {
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  status: TaskStatus;
  price?: number;
  image?: string;
  city: UserCity;
  address?: string;
  tags?: Tag[];
  responses: string[];
  comments?: Comment[];
  userId: string;
  performerId?: string;
  createdAt?: Date;
}
