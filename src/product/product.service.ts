import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { ProductType } from './procust.types';
import { productDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly ProductSchema: Model<productDocument>,
  ) {}

  createProduct(product: ProductType) {
    return this.ProductSchema.create(product);
  }
  getAllProducts() {
    return this.ProductSchema.find();
  }
  getProductById(id: string) {
    return this.ProductSchema.findById(id);
  }

  deleteProduct(id: string) {
    return this.ProductSchema.deleteOne({ _id: id });
  }

  async updateProduct(
    id: string,
    newProduct: { name?: string; description?: string; price?: number },
  ) {
    const product = await this.ProductSchema.findById(id);
    product.name = newProduct.name ?? product.name;
    product.price = newProduct.price ?? product.price;
    product.description = newProduct.description ?? product.description;

    return product.save();
  }
}
