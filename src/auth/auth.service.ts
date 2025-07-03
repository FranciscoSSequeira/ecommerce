import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async singIn(email: string, password: string){
        const userFound = await this.usersRepository.findByEmail(email)
        const isPasswordMatch = await bcrypt.compare(password, userFound?.password);

        if (!userFound || !isPasswordMatch) {
            return 'Credenciales incorrectas';
        }

        const userPayload = {
            id: userFound.id,
            email: userFound.email, 
            isAdmin: userFound.isAdmin,
        }

        const token = this.jwtService.sign(userPayload);

        return {
            message: 'Login exitoso',
            token
        };
        // if(!userFound || userFound?.password !== password) {
        //     return 'Credenciales incorrectas'
        // }
        // return 'Login exitoso'
  
}

    async signUp(user: CreateUserDto) {
        const userFound = await this.usersRepository.findByEmail(user.email);
        if (userFound) {
            return 'El usuario ya existe';
        }

        if(user.password !== user.confirmPassword) {
            return 'Las contraseñas no coinciden';
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);

        if(!hashedPassword) {
            return 'Error al hashear la contraseña';
        }

        await this.usersRepository.addOne({
            ...user,
            password: hashedPassword,
        })

        const { password, confirmPassword, ...userWithoutPassword } = user; // Exclude password and confirmPassword from the new user object
        

    //     const newUser = {
    //          ...user,
    //          password: hashedPassword,
    //          id: '', // or generate a new id if needed
    //          isAdmin: false, // default value, adjust as needed
    //          orders: [] // default empty array
    //  };

        // return await this.usersRepository.create(newUser);
        return userWithoutPassword; // Return the user object without password and confirmPassword}
        }
}
