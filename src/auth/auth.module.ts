import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
