import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, GetProductsDto } from './dto';
import { Product } from '@prisma/client';
import { PaginationResult } from 'src/common/interfaces/PaginationResult';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  // getFilteredProducts(
  //   @Query() query: GetProductsDto,
  // ): Promise<PaginationResult<Product>> {
  //   return this.productService.getFilteredProducts(query);
  // }
  getAllProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProduct(productId);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }
}
