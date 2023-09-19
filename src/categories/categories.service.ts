import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

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
  getAllCategories() {
    return mockCategories;
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
