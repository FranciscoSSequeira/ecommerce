import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/products.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length:50,
        nullable: false,
    })
    name: string

    @OneToMany(() => Product, (product)=> product.category)
    @JoinColumn({ name: 'product_id'})
    products: Product[]
}