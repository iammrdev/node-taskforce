export interface Review {
  id?: number;
  text: string;
  taskId: number;
  rating: number;
  userId: string;
  createdAt?: Date;
}
