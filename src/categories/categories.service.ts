import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const mockCategories: Category[] = [
  {
    id: 5,
    name: 'category #5',
    description: 'lorem ipsum',
  },
  {
    id: 8,
    name: 'cat #8',
    description: 'dasdsadas',
  },
  {
    id: 6,
    name: '#6',
    description: '',
  },
  {
    id: 3,
    name: 'sadsadsadsa',
    description: '',
  },
  {
    id: 2,
    name: 'qwe',
    description: 'qwe qwe qwe',
  },
];

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getItemsQtyInCategory(categoryId: number): Promise<number> {
    const qty = await this.prisma.product.count({
      where: {
        categoryId,
      },
    });
    return qty;
  }

  async getAllCategories() {
    const categories = await Promise.all(
      mockCategories.map(async (c) => {
        const itemsQuantity = await this.getItemsQtyInCategory(c.id);
        return {
          ...c,
          itemsQuantity,
        };
      }),
    );
    return categories;
  }

  getCategoryById(categoryId: number) {
    const category = mockCategories.find(
      (category) => category.id === categoryId,
    );
    if (category) {
      return category;
    } else {
      throw new NotFoundException('No such a category');
    }
  }
}
