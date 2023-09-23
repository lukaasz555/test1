import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

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

  @Post()
  addNewCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }
}
