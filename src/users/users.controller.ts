import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
// import { validateUser } from './utils/validate';
import { CreateUserDto } from './dto/create-user.dto';
import { Order } from '../orders/entities/orders.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorator/roles/roles.decorator';
import { Role } from '../enum/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Endpoint')
@Controller('users')
export class UsersController {
     constructor(private readonly userService: UsersService) {}

            @Get()
            @ApiOperation({ summary: 'lista todos los users' })
            @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
            @ApiResponse({ status: 401, description: 'Unauthorized' })
            @ApiResponse({ status: 404, description: 'Not Found' })
            @ApiBearerAuth()
            @Roles(Role.Admin)
            // @HttpCode(HttpStatus.OK)
            @UseGuards(AuthGuard, RolesGuard)
            async getUsers(@Query('page') page: number,@Query('limit')limit:number){
                return await this.userService.findAll(page, limit)
            }

            @Get(':id')
            @ApiOperation({ summary: 'lista de users por id' })
            @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
            @ApiResponse({ status: 401, description: 'Unauthorized' })  
            @ApiResponse({ status: 404, description: 'Not Found' })
            @ApiBearerAuth()
            @HttpCode(HttpStatus.OK)
            @UseGuards(AuthGuard)
            async findOne(@Param('id', ParseUUIDPipe) id:string){
                return await this.userService.findOne(id)
            }

            @Put(':id')
            @ApiOperation({ summary: 'actualiza un user por id' })
            @ApiResponse({ status: 200, description: 'Usuario actualizado', type: User })
            @ApiResponse({ status: 401, description: 'Unauthorized' })
            @ApiResponse({ status: 404, description: 'Not Found' })
            @ApiBearerAuth()
            @HttpCode(HttpStatus.OK)
            @UseGuards(AuthGuard)
            async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: CreateUserDto){
                    return await this.userService.update(id, updateUser)                
            }

            @Delete(':id')
            @ApiOperation({ summary: 'elimina un user por id' })
            @ApiResponse({ status: 200, description: 'Usuario eliminado' })
            @ApiResponse({ status: 401, description: 'Unauthorized' })
            @ApiResponse({ status: 404, description: 'Not Found' })
            @HttpCode(HttpStatus.OK)
            @UseGuards(AuthGuard)
            async remove(@Param('id', ParseUUIDPipe) id: string){
                return await this.userService.remove(id)
            }
}
