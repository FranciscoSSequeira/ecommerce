import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token de autorización no proporcionado');
        }

        try {
            const secret = process.env.JWT_SECRET;

            const user = this.jwtService.verify(token, { secret });
            user.exp = new Date(user.exp * 1000); 
            user.iat = new Date(user.iat * 1000); 

            if(user.isAdmin){
                user.roles = ['admin']; // Asignar el rol de admin si es un usuario administrador
            }else{
                user.roles = ['user']; // Asignar el rol de user si no es administrador
            }
            
            request.user = user; 
            // Agregar el usuario al request para que esté disponible en el controlador
            
            return true;
            
        } catch{
            throw new UnauthorizedException('Token de autorización inválido o expirado');
        }
        // const authHeader = request.headers.authorization

        // if(!authHeader){
        //     throw new UnauthorizedException('El header de autorizacion no existe') 
        // }
        // const email = authHeader.split(':')[0]
        // const password = authHeader.split(':')[1]
    
        // if(!email || !password){
        //     throw new UnauthorizedException('credenciales invalidas') 
        // }

        // return true
    }
}