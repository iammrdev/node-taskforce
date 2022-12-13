import { genSalt, hash, compare } from 'bcrypt';
import { User, UserRole } from '@taskforce/shared-types';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity implements User {
  public _id: string;
  public avatar: string;
  public birthDate: Date;
  public email: string;
  public name: string;
  public surname: string;
  public passwordHash: string;
  public role: UserRole;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {
      _id: this._id,
      avatar: this.avatar,
      email: this.email,
      name: this.name,
      surname: this.surname,
      birthDate: this.birthDate,
      passwordHash: this.passwordHash,
      role: this.role,
    };
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.birthDate = user.birthDate;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
  }
}
