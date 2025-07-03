import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/orders.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        required: true,
        description: 'ID del usuario',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    @ApiProperty({
        required: true,
        description: 'Nombre del usuario',
        example: 'Juan Perez',
    })
    name: string

    @Column({
        type: 'varchar',
        length:50,
        nullable:false,
        unique: true,
    })
    @ApiProperty({
        required: true,
        description: 'Email del usuario',
        example: 'usuario@mail.com',
    })
    email: string

    @Column({
        type:'varchar',
        // length: 20,
        nullable: false, // tuve que poner que los valores null los tome porque no me permitia levantar la app.
        // tiraba error la columna «password» de la relación «user» contiene valores null
    })
    @ApiProperty({
        required: true,
        description: 'Contraseña del usuario',
        example: 'Password123!',
    })
    password: string

    @Column({
        type: 'int',
    })
    @ApiProperty({
        required: true,
        description: 'Número de teléfono del usuario',
        example: '1234567890',
    })
    phone: number

    @Column({
        type: 'varchar',
        length: 50,
    })
    @ApiProperty({
        required: true,
        description: 'País del usuario',
        example: 'Argentina',
    })
    country: string

    @Column({
        type: 'text',
    })  
    @ApiProperty({
        required: true,
        description: 'Dirección del usuario',
        example: '123 Main St, Apt 4B, Springfield, IL',
    })
    address: string
    
    @Column({
        type:'varchar',
        length:50,
    })
    @ApiProperty({
        required: true,
        description: 'Ciudad del usuario',
        example: 'Buenos Aires',
    })
    city: string

    @Column({
        type: 'boolean',
        default:false,
    })  
    @ApiProperty({
        required: true,
        description: 'Indica si el usuario es administrador',
        example: false,
    })
    isAdmin: boolean
    
    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({name: 'orders_id'})
    orders: Order[]

}