export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  passwordHash: string;
  role: UserRole;
}
