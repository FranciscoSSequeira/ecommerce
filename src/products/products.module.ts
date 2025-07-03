import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Category } from '../categories/entities/categories.entity';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), // <-- agrega aquí tus entidades
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
