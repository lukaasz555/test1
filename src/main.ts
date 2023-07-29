import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
