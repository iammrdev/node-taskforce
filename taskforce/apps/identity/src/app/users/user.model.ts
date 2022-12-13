import { Document } from 'mongoose';
import { User, UserRole } from '@taskforce/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public surname: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({ required: true })
  public birthDate: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
