import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, minlength: 6, maxlength: 15 })
  username: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: false, default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
