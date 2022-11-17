import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type userDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  hashedPassword: string;
}

export const userSchema = SchemaFactory.createForClass(User);
