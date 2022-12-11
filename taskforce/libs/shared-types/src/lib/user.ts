export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  surname: string;
  birthDate: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
}
