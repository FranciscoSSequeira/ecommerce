import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/products.entity';
import { FileUploadRepository } from './file-upload.repository';
import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], 
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository, CloudinaryConfig],
})
export class FileUploadModule {}
