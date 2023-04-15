import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from "./app.module.";

async function start() {
  const PORT = process.env.port || 5000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
