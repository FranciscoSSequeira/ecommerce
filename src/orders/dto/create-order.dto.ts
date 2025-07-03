import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Product } from "../../products/entities/products.entity"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        required: true, 
        description: 'ID del usuario que realiza la orden',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    userId: string

    @IsArray()
    @ArrayMinSize(1, 
        {message: 'Debe haber al menos un producto en la orden'})
    @ValidateNested({ each: true })
    @ApiProperty({
        required: true,
        description: 'Lista de productos en la orden',
        type: [Product],
        example: [
            {
                id: '123e4567-e89b-12d3-a456-426614174001',
                name: 'Producto 1',
                price: 100,
                quantity: 2
            },
            {
                id: '123e4567-e89b-12d3-a456-426614174002',
                name: 'Producto 2',
                price: 50,
                quantity: 1
            }
        ]
    })
    products: Partial<Product[]>
}
