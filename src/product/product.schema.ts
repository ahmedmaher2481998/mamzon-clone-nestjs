import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type productDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, type: mongoose.Schema.Types.String, minlength: 3 })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
