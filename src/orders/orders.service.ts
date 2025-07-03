import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  addOrder(dto: CreateOrderDto) {
    const { userId, products } = dto

    return this.ordersRepository.addOrder(userId, products)
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id)
  }
}
