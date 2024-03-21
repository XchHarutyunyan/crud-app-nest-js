import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // cors configs
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['auth-cookie'],
  });
  // global prefix
  app.setGlobalPrefix('api/v1');
  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
