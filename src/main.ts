import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  await app.listen(3000);
  logger.log(`App runnig on Port ${process.env.PORT}`);
}
main();
