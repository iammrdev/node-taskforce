export interface Comment {
  id?: number;
  text: string;
  taskId: number;
  userId: string;
  createdAt?: Date;
}
