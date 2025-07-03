import { NotFoundException } from "@nestjs/common"
import { User } from "./entities/users.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

export class UsersRepository{
   constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
   ){}
    

    async findAll(page: number = 1, limit: number =5): Promise<Partial<User>[]> {
        try {
            let users = await this.usersRepository.find()
    
            const startIndex = (page - 1) * limit
            const endIndex = startIndex + +limit
    
            users = users.slice(startIndex, endIndex)
    
            return users.map(({password, ...user}) => user)
            
        } catch (error) {
            throw new NotFoundException('Error al obtener los usuarios')
            
        }  
    }   

    async findOne(id: string) {
        try {
            const user = await this.usersRepository.findOne({
                where: {id},
                relations: {
                    orders: true,
                },
            })
    
            if(!user) {
                throw new NotFoundException('Usuario no encontrado')
            }
            const { password, isAdmin, ...userWithoutPassword } = user
    
            return userWithoutPassword
            
        } catch (error) {   
            throw new NotFoundException('Error al obtener el usuario')            
        } 
    }

    async findByEmail(email: string): Promise<Partial<User> | null> {
        try {
            return await this.usersRepository.findOneBy({email})

        } catch (error) {
            throw new NotFoundException('Error al buscar el usuario por email')
        }
    }

    async update(id: string, user: Partial<User>): Promise<Partial<User>> {
        try {
            console.log('UPDATE - ID recibido:', id);
            console.log('UPDATE - Datos recibidos:', user);

            await this.usersRepository.update(id, user)
    
            const updateUser = await this.usersRepository.findOneBy({id})
    
            console.log('UPDATE - Resultado de findOneBy:', updateUser);


            if (!updateUser) {
                console.log('UPDATE - Usuario no encontrado tras update');

              throw new NotFoundException('Usuario no encontrado')
            }
    
            const { password, isAdmin, ...userWithoutPassword } = updateUser
            console.log('UPDATE - Usuario retornado:', userWithoutPassword);


            return userWithoutPassword
            
        } catch (error) {
            console.log('UPDATE - Error:', error);

            throw new NotFoundException('Error al actualizar el usuario')
            
        }

    }

    async addOne(user: Partial<User>): Promise<Partial<User>>{
        try {
            const newUser = await this.usersRepository.save(user)
    
            const {password, isAdmin, ...userWithoutPassword } = newUser
    
            return userWithoutPassword
            
        } catch (error) {
            throw new NotFoundException('Error al agregar el usuario')
        }

    }

    async delete(id: string): Promise<Partial<User>> {
        try {
            const user = await this.usersRepository.findOneBy({id})
            
            if(!user) {
                throw new NotFoundException('User not found')
            }
    
            this.usersRepository.remove(user)
    
            const {password, isAdmin, ...userWithoutPassword } = user
    
            return userWithoutPassword
            
        } catch (error) {
            throw new NotFoundException('Error al eliminar el usuario')
            
        }
    }

}
