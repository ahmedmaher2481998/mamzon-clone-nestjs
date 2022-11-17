import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProductType, updateProductType } from './procust.types';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  create(@Body() body: ProductType) {
    return this.productService.createProduct(body);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateProduct(
    @Param('id') id: string,
    @Body() newProduct: updateProductType,
  ) {
    return this.productService.updateProduct(id, newProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
