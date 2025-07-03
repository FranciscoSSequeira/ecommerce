import { PartialType } from '@nestjs/swagger';
import { Product } from '../entities/products.entity';

export class UpdateProductDto extends PartialType(Product) {}