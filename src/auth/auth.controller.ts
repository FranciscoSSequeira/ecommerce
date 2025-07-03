import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/users.entity';
import { Order } from '../orders/entities/orders.entity';
import { UsersService } from '../users/users.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Endpoint')
@Controller('auth')
export class AuthController {
    // userService: any;
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ){}
    
    @Post('signin')
    @ApiBody({
        type: LoginUserDto,
            examples: {
        login: {
            summary: 'Ejemplo de login a modificar',
            value: {
            email: 'usuarioFalso@mail.com',
            password: 'Pass!1234'
            }
        }
        }
    })
    @ApiOperation({ summary: 'Iniciar sesión de un usuario' })
    @ApiResponse({ status: 200, description: 'User signed in successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    // signIn(@Body('email') credentials: LoginUserDto){
        signIn(@Body() credentials: LoginUserDto){

        const { email, password } = credentials;
        return this.authService.singIn(email, password)
   
    }

    @Post('signup')
     @ApiBody({
        type: CreateUserDto,
            examples: {
            singUp: {
                summary: 'Ejemplo de usuario a crear',
                value: {
                   "name": "Juan Perez",
                    "email": "juanperez@mail.com",
                    "password": "Pass!1234",
                    "confirmPassword": "Pass!1234",
                    "address": "123 Main St, Apt 4B, Springfield, IL",
                    "phone": 1234567890,
                    "country": "Argentina",
                    "city": "Buenos Aires"
                    }
                }
                }
            })
            @ApiOperation({ summary: 'Registrar un nuevo usuario' })
            @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
            @ApiResponse({ status: 400, description: 'Bad Request' })
            @ApiResponse({ status: 500, description: 'Internal Server Error' })
            @ApiResponse({ status: 404, description: 'Not Found' })
            //  @HttpCode(HttpStatus.CREATED)
            async signUp(@Body() createUser: CreateUserDto){
             
                return await this.authService.signUp(createUser)

            }
}
