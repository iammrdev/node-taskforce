import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserCity, UserRole } from '@taskforce/shared-types';

export interface UserInfo {
  _id: string;
  email: string;
  role: string;
  city: UserCity;
}

export const UserInfoPipe = createParamDecorator(
  (validRole: UserRole, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();

    if (validRole && user.role !== validRole) {
      throw new ForbiddenException('forbidden');
    }

    return user;
  }
);
