export interface Subscriber {
  _id?: string;
  email: string;
  name: string;
  surname: string;
  userId: string;
  notifiedDate?: Date;
}
