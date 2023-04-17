import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import fmp = require('@fastify/multipart');

import { AppModule } from "./app.module.";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.port || 5000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fmp);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Backend на Nest.js + Fastify + Sequelize')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Talla2XLC backend')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
