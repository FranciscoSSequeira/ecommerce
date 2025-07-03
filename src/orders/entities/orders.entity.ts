import{
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderDetail } from './orders-details.entity'
import { User } from '../../users/entities/users.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: Date

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User
}