import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository){}
    
    async findAll(page: number, limit: number) {
        return await this.productsRepository.findAll(page, limit);
    }
    
    async addOne(createProduct: Product) {
    return await this.productsRepository.addOne(createProduct);
    }
     
    async findOne(id: string) {
        return await this.productsRepository.findOne(id);
    }
    
    async addProducts() {
    return await this.productsRepository.addProducts();
    }

    async update(id: string, product: Partial<Product>) {
    return await this.productsRepository.update(id, product);
    } 

   
    async remove(id: string) {
    return await this.productsRepository.remove(id);
    }
}
