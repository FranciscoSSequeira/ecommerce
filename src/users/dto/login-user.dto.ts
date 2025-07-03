import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
        @IsNotEmpty()
        @IsEmail()
        email: string
    
        @IsString()
        @MinLength(8)
        @MaxLength(15)
        @IsStrongPassword({
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
        })
        @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
            message: 'La contraseña solo puede contener los siguientes símbolos: !@#$%^&*',
        })
        @Matches(/[!@#$%^&*]/, {
            message: 'La contraseña debe contener al menos un símbolo: !@#$%^&*',
        })
        password: string
    }