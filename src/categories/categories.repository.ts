import { Injectable } from "@nestjs/common";
import * as data from '../products/utils/seeders/data.json'
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository : Repository<Category>,
    ) {}

    async getCategories() {
        try {
            return await this.categoriesRepository.find()
            
        } catch (error) {
            throw new Error('Error al obtener las categorias')
            
        }
    }

    async addCategories() {
        try {
            //agregado 
            // Verificar si hay datos para agregar las categorias
            if(!data || !Array.isArray(data)) {
                throw new Error('No hay datos para agregar las categorias')
            }
            // Verificar si el array de datos esta vacio
            if(data.length === 0) {
                return 'No hay categorias para agregar'
            }
            // Verificar si las categorias ya existen
            const existingCategories = await this.categoriesRepository.find({   
                where: data.map(element => ({ name: element.category })),
            });
            // hasta aca agregado
    
            for ( const element of data as { category: string} []) {
                const categoryExists = await this.categoriesRepository.findOne({
                    where: { name: element.category },
                })
    
                if(!categoryExists) {
                    const newCategory = this.categoriesRepository.create({
                        name: element.category,
                    })
                    await this.categoriesRepository.save(newCategory)
                }
            }
    
            return 'Categorias agregadas'
            
        } catch (error) {
            throw new Error('Error al agregar las categorias')
        }

    }
}