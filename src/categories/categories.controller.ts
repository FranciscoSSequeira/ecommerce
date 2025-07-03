import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories Endpoint')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  @ApiOperation({ summary: 'Agrega categorias de prueba' })
  @ApiResponse({ status: 201, description: 'Categorias agregadas correctamente' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async addCategories() {
    return await this.categoriesService.addCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas las categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias', type: [String] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

}
