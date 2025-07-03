import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "../../products/entities/products.entity";

@Entity()
export class OrderDetail{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number

    @OneToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn({ name: 'order_id'})
    order: Order

    @ManyToMany(() => Product)
    @JoinTable({ 
        name: 'order_details_products',
    })
    products: Product[]
}