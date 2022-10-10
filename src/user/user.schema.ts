import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    minlength: 6,
    maxlength: 15,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
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
