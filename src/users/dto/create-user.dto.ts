import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Matches, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)  
    @ApiProperty({
        required: true,
        description: 'Nombre del usuario',
        example: 'Juan Perez',
    })
    name: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        required: true,
        description: 'Email del usuario',
        example: 'juanperez@mail.com'
    })
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
    @ApiProperty({
        required: true,
        description: 'Contraseña del usuario',
        example: 'Password123!'
    })
    password: string

    @IsNotEmpty()
    confirmPassword: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        required: true,
        description: 'Dirección del usuario',
        example: '123 Main St, Apt 4B, Springfield, IL',
    })
    address: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        required: true,
        description: 'Número de teléfono del usuario',
        example: 1234567890
    })
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        required: true,
        description: 'País del usuario',
        example: 'Argentina'
    })
    country: string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        required: true,
        description: 'Ciudad del usuario',
        example: 'Buenos Aires'
    })
    city: string

    @IsEmpty()
    isAdmin?: boolean
}