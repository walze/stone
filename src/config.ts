import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { from, tap } from 'rxjs';
import { AppModule } from './app.module';

export const setupSwagger = (app: INestApplication) => {
  const builder = new DocumentBuilder()
    .setTitle('Custom API')
    .setDescription('User Sign Up')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, builder);

  SwaggerModule.setup('api', app, document);
};

export const api = from(NestFactory.create(AppModule)).pipe(
  tap(setupSwagger),
  tap((app) => app.listen(3000)),
);
