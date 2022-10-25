import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { isUsername } from './user.utils';
import { isEmail } from 'class-validator';
import { usernameMaxLength, usernameMinLength } from './user.constants';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    minlength: usernameMinLength,
    maxlength: usernameMaxLength,
    validate: [isUsername],
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    validate: [isEmail],
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, required: false, default: false })
  active: boolean;

  @Prop({
    type: Date,
    default: () => new Date(),
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
