import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    FileUploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Trỏ đến thư mục chứa ảnh
      serveRoot: '/uploads', // URL để truy cập ảnh
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
