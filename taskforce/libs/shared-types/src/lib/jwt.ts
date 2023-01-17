import { UserCity, UserRole } from '@taskforce/shared-types';

export interface JwtPayload {
  email: string;
  role: UserRole;
  sub: string;
  exp: number;
  city: UserCity;
}
