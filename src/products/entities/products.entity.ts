
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "../../orders/entities/orders-details.entity";
import { Category } from "../../categories/entities/categories.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        required: true,
        description: 'ID del producto',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string

    @Column({
        type:'varchar',
        length:50,
        unique: true,
        nullable: false,
    })
    @ApiProperty({
        required: true,
        description: 'Nombre del producto',
        example: 'Smartphone XYZ',
    })
    name: string

    @Column({
        type: 'text',
        nullable: false,
    })
    @ApiProperty({
        required: true,
        description: 'Descripción del producto',
        example: 'Un smartphone de última generación con pantalla AMOLED y cámara de 108MP.',
    })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    @ApiProperty({
        required: true,
        description: 'Precio del producto',
        example: 999.99,
    })
    price: number

    @Column({
        type: 'int',
        nullable: false,
    })
    @ApiProperty({
        required: true,
        description: 'Cantidad de stock del producto',
        example: 100,
    })
    stock: number

    @Column({
        type: 'text',
        default: 'https://www.google.com/imgres?q=logo%20marca%20de%20tecnologia&imgurl=https%3A%2F%2Fmarketplace.canva.com%2FEAE_-RFkTMw%2F1%2F0%2F1600w%2Fcanva-p%25C3%25BArpura-moderno-tecnolog%25C3%25ADa-y-videojuegos-logotipo--He-eTNlGWM.jpg&imgrefurl=https%3A%2F%2Fwww.canva.com%2Fes_mx%2Flogos%2Fplantillas%2Ftecnologia%2F&docid=p5lvBD5hv0RIuM&tbnid=hFRXB4GlP69sWM&vet=12ahUKEwjHwY35mcyNAxUBpZUCHXL4GiIQM3oECFoQAA..i&w=1600&h=1600&hcb=2&ved=2ahUKEwjHwY35mcyNAxUBpZUCHXL4GiIQM3oECFoQAA'
    })
    @ApiProperty({
        required: true,
        description: 'URL de la imagen del producto',
        example: 'https://www.example.com/product-image.jpg',
    })
    imgUrl: string

    @ManyToMany(() => OrderDetail, (OrderDetail) => OrderDetail.products)
    orderDetail: OrderDetail[]

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: Category
} 