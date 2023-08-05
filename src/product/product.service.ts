import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    const products: Product[] = await this.prisma.product.findMany();
    return products;
  }

  async getProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (product) {
      return product;
    } else {
      throw new NotFoundException('No such a product');
    }
  }

  async createProduct(dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description || undefined,
      },
    });

    return product.id;
  }
}
