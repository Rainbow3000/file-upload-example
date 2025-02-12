import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          let folder = 'uploads'; // folder mặc định đc upload;
          if (file.originalname.includes('product')) {
            folder = 'uploads/products';
          } else if (file.originalname.includes('category')) {
            folder = 'uploads/categories';
          }

          // Tạo thư mục nếu chưa tồn tại
          if (!existsSync(folder)) {
            mkdirSync(folder, { recursive: true });
          }

          cb(null, folder);
        },
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
