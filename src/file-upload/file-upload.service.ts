import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/products.entity';
import { Repository } from 'typeorm';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async uploadProductImage(productId: string, file: Express.Multer.File) {
        const productExists = await this.productRepository.findOneBy({  
            id: productId, }
        );
        if (!productExists) {
            throw new Error('Product not found');
        };

        const uploadImage = await this.fileUploadRepository.uploadImage(file);

        await this.productRepository.update(productId, {  
            imgUrl: uploadImage.secure_url, 
        }); 
        
        const updatedProduct = await this.productRepository.findOneBy({  
            id: productId,  
        });

        return updatedProduct;

    }
}
