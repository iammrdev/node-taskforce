import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserCity } from '@taskforce/shared-types';

export interface UserInfo {
  _id: string;
  email: string;
  role: string;
  city: UserCity;
}

export const UserInfoPipe = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  }
);
