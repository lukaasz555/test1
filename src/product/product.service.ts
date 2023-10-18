import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, GetProductsDto } from './dto';
import { PaginationResult } from 'src/common/interfaces/PaginationResult';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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

  async getProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async getFilteredProducts(query: GetProductsDto) {
    const paginationData = {
      skip: (Number(query.page) - 1) * Number(query.itemsPerPage),
      take: Number(query.itemsPerPage),
    };

    if (query.searchValue) {
      Object.assign(paginationData, {
        where: {
          name: {
            contains: query.searchValue,
            mode: 'insensitive',
          },
        },
      });
    }

    if (query.sortDesc) {
      Object.assign(paginationData, {
        orderBy: {
          price: query.sortDesc === '1' ? 'desc' : 'asc',
        },
      });
    }

    const products = await this.prisma.product.findMany(paginationData);
    const totalProductsQty = await this.prisma.product.count();

    const res: PaginationResult<Product> = {
      page: Number(query.page),
      itemsPerPage: Number(query.itemsPerPage),
      totalRecords: totalProductsQty,
      totalPages: Math.ceil(totalProductsQty / +query.itemsPerPage),
      items: products,
    };

    return res;
  }

  async createProduct(dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        categoryId: dto.categoryId,
        description: dto.description || undefined,
      },
    });

    return product.id;
  }
}
