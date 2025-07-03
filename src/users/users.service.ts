import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
       constructor(private readonly usersRepository: UsersRepository){}
        
        async findAll(page: number, limit: number) {
            return await this.usersRepository.findAll(page, limit)     
        }  
        
        async findOne(id: string) {
            return await this.usersRepository.findOne(id)
        }

        async addOne(createUser: User){
            return await this.usersRepository.addOne(createUser)
        }

        async update(id: string, updateUser: CreateUserDto) {
            const { confirmPassword, ...userData } = updateUser;

            return await this.usersRepository.update(id, userData);
        }

        async remove(id: string){
            return await this.usersRepository.delete(id)
        }

        async signUp(user: User): Promise<User> {
            return user;
        }
}
