import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/orders-details.entity";
import { Order } from "./entities/orders.entity";
import { User } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import { Product } from "../products/entities/products.entity";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>, 
    ) {}

    async addOrder(userId: string, products: any){
        try {
            let total = 0
            const user = await this.usersRepository.findOneBy({ id: userId})
    
            if(!user) {
                return 'User not found'
            }
    
            const order = new Order()
            order.date= new Date()
            order.user = user
    
            const newOrder = await this.ordersRepository.save(order)
    
            const productsArray = await Promise.all(
                products.map(async (element) => {
                    const product = await this.productsRepository.findOneBy({
                        id: element.id
                    })
    
                    if(!product){
                        return 'Product not found'
                    }
    
                    total += Number(product.price)
    
                    await this.productsRepository.update(
                        { id: element.id},
                        { stock: product.stock - 1},
                    )
    
                    return product
                })
            )
    
            const orderDetail = new OrderDetail()
    
            orderDetail.price = Number(Number(total).toFixed(2))
            orderDetail.products = productsArray
            orderDetail.order = newOrder
    
            await this.orderDetailsRepository.save(orderDetail)
    
            return await this.ordersRepository.find({
                where: { id: newOrder.id},
                relations: {
                    orderDetail: true,
                },
            })
            
        } catch (error) {
            return 'Error creating order'
            
        }

    }

    async getOrder(id: string){
        try {
            // agregado
            if(!id) {
                return 'Id is required'
            }
            // hasta aca agregado

            const order = await this.ordersRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    orderDetail: {
                        products: true,
                    },
                },
            })
            if(!order){
                return 'Order not found'
            }
            return order
            
        } catch (error) {
            return 'Error getting order'
        }
    }
}