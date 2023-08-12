import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import initializeI18n from './i18n';
import prisma from './prisma';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeI18n();
  await prisma.$connect();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.port);
}
bootstrap();
