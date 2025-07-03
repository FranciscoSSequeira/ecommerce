import { Product } from "./entities/products.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as data from '../products/utils/seeders/data.json'
import { Category } from "../categories/entities/categories.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    ) {}

    async findAll(page: number = 1, limit: number =5): Promise<Product[]> {
         try {
            const products = await this.productsRepository.find({
                relations: { 
                    category: true,
                },
            })

            let inStock = products.filter((product) => product.stock > 0)

            const startIndex = (page - 1) * limit
            const endIndex = startIndex + +limit

            inStock = inStock.slice(startIndex, endIndex)

            return inStock
            
         } catch (error) {
            throw new InternalServerErrorException('Error al obtener los productos');
         }
       
    } 

    async findOne(id: string) {
         try {
            const product = await this.productsRepository.findOneBy({ id });

            if (!product) {
                throw new NotFoundException('Producto no encontrado');
            }

            return product;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Error al buscar el producto');
        }
           
        }
    
    async addProducts() {
         try {
            const categories = await this.categoriesRepository.find();

            type ProductSeed = {
                name: string;
                description: string;
                price: number;
                stock: number;
                category: string;
            };

            for (const element of data as ProductSeed[]) {
                const relatedCategory = categories.find(
                    (category) => category.name === element.category,
                );

                if (!relatedCategory) {
                    throw new NotFoundException(`Categoría '${element.category}' no encontrada para el producto '${element.name}'`);
                }

                const product = new Product();
                product.name = element.name;
                product.description = element.description;
                product.price = element.price;
                product.stock = element.stock;
                product.category = relatedCategory;

                await this.productsRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values(product)
                    .orUpdate(['description', 'price', 'stock'], ['name'])
                    .execute();
            }
            return 'Productos agregados';
        } catch (error) {
            throw new InternalServerErrorException('Error al agregar productos');
        }
    }

    async update(id: string, product: Partial<Product>) {
         try {
            await this.productsRepository.update(id, product);

            const updatedProduct = await this.productsRepository.findOneBy({ id });

            if (!updatedProduct) {
                throw new NotFoundException('Producto no encontrado para actualizar');
            }

            return updatedProduct;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Error al actualizar el producto');
        }
        }

    async addOne(product: Partial <Product>): Promise<Partial<Product>> {
        try {
            const newProduct = await this.productsRepository.save(product);
            return newProduct;
        } catch (error) {
            throw new BadRequestException('Error al agregar el producto');
        }

    }

    async remove(id: string): Promise<{ message: string; product: Partial<Product> }> {
        try {
            const product = await this.productsRepository.findOneBy({ id });

            if (!product) {
                throw new NotFoundException('Producto no encontrado');
            }

            await this.productsRepository.remove(product);

            return {
                message: 'Producto eliminado',
                product,
            };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Error al eliminar el producto');
        }
        
    }

}