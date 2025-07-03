import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';
import { validateProduct } from './utils/validate';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorator/roles/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../enum/roles.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/createProduct.Dto';

@ApiTags('Products Endpoint')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}
        
        @Get()
        @ApiOperation({ summary: 'Lista todos los productos' })
        @ApiResponse({ status: 200, description: 'Lista de productos', type: [Product] })
        @ApiResponse({ status: 401, description: 'Unauthorized' })
        @ApiResponse({ status: 404, description: 'Not Found' })
        @ApiResponse({ status: 500, description: 'Internal Server Error' })
        @ApiResponse({ status: 400, description: 'Bad Request' })   
        @HttpCode(HttpStatus.OK)
        async findAll(@Query('page') page: number,@Query('limit')limit:number){
            if(page && limit) {
                return await this.productService.findAll(page, limit)
            } else {
                return await this.productService.findAll(1, 5)
            }
        }

        @Get('seeder')
        @ApiOperation({ summary: 'Agrega productos de prueba' })
        @ApiResponse({ status: 201, description: 'Productos agregados correctamente' })
        @ApiResponse({ status: 401, description: 'Unauthorized' })
        @ApiResponse({ status: 404, description: 'Not Found' }) 
        @ApiResponse({ status: 500, description: 'Internal Server Error' })
        @ApiResponse({ status: 400, description: 'Bad Request' })
        async addProducts(){
            return await this.productService.addProducts()
        }

        @Get(':id')
        @ApiOperation({ summary: 'Lista de productos por id' })
        @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })    
        @ApiResponse({ status: 401, description: 'Unauthorized' })
        @ApiResponse({ status: 404, description: 'Not Found' })
        @ApiResponse({ status: 500, description: 'Internal Server Error' })
        @ApiResponse({ status: 400, description: 'Bad Request' })
        @HttpCode(HttpStatus.OK)
        async findOne(@Param('id', ParseUUIDPipe) id:string){
            return await this.productService.findOne(id)
        }

        @Post()
        @ApiOperation({ summary: 'Agrega un producto' })
        @ApiResponse({ status: 201, description: 'Producto agregado correctamente', type: Product })    
        @ApiResponse({ status: 401, description: 'Unauthorized' })
        @ApiResponse({ status: 404, description: 'Not Found' })
        @ApiResponse({ status: 500, description: 'Internal Server Error' })
        @ApiResponse({ status: 400, description: 'Bad Request' })
        @HttpCode(HttpStatus.CREATED)
        async addOne(@Body() createProduct: Product){
            if(validateProduct(createProduct)){
                return await this.productService.addOne(createProduct)
        }else{
            return 'producto no valido'
            }
        }
     
        @Put(':id')
        @ApiBearerAuth()
        @ApiBody({ type: UpdateProductDto })
        @ApiOperation({ summary: 'Actualiza un producto por id' })
        @ApiResponse({ status: 200, description: 'Producto actualizado', type: Product })   
        @ApiResponse({ status: 401, description: 'Unauthorized' })
        @ApiResponse({ status: 404, description: 'Not Found' })
        @ApiResponse({ status: 500, description: 'Internal Server Error' })
        @ApiResponse({ status: 400, description: 'Bad Request' })
        @Roles(Role.Admin)
        @HttpCode(HttpStatus.OK)
        @UseGuards(AuthGuard, RolesGuard)
        async update(
            @Param('id', ParseUUIDPipe) id: string, 
            @Body() updateProduct: UpdateProductDto){
            if(validateProduct(updateProduct)){
                return await this.productService.update(id, updateProduct)
            }else {
                return 'producto no valido'
            }
        }
 
        @Delete(':id')
        @ApiOperation({ summary: 'Elimina un producto por id' })
        @ApiResponse({ status: 200, description: 'Producto eliminado' })
        @ApiResponse({ status: 401, description: 'Unauthorized' })
        @ApiResponse({ status: 404, description: 'Not Found' })
        @ApiResponse({ status: 500, description: 'Internal Server Error' })
        @ApiResponse({ status: 400, description: 'Bad Request' })
        @HttpCode(HttpStatus.OK)
        async remove(@Param('id', ParseUUIDPipe) id: string){
            return await this.productService.remove(id)
        }

}
