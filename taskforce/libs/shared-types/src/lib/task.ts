import { Tag } from './tag';
import { Comment } from './comment';

export enum TaskStatus {
  Created = 'admin',
  Cancelled = 'user',
  Pending = 'pending',
  Done = 'done',
  Failed = 'failed',
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  status: TaskStatus;
  price: number;
  image: string;
  address: string;
  tags: Tag[];
  userId: string;
  comments: Comment[];
  createdAt?: Date;
}
