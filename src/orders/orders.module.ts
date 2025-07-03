import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orders-details.entity';
import { Order } from './entities/orders.entity';
import { User } from '../users/entities/users.entity';
import { Product } from '../products/entities/products.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
