import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('File Upload Endpoint')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @ApiOperation({ summary: 'Sube una imagen de producto' })
  @ApiResponse({ status: 201, description: 'Imagen subida correctamente' }) 
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 413, description: 'Payload Too Large' })
  @ApiResponse({ status: 415, description: 'Unsupported Media Type' })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProduct(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [ 
          new MaxFileSizeValidator({
             maxSize: 200 * 1024,
            message:' el archivo es demasiado pesado.',
           }), 
           new FileTypeValidator({
             fileType: /(jpg|jpeg|png|webp)$/,
           }),
        ],
    }) 
  )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(id, file)
  }
}
