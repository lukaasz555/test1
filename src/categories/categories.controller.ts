import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoriesService.getCategoryById(categoryId);
  }
}
