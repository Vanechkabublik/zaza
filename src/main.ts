import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
  );

    app.use('/uploads', express.static(configService.getOrThrow<string>('UPLOAD_BASE_PATH')));

  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();