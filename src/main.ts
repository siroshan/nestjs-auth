import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allows resources to be requested from another domain
  app.enableCors();

  //  by binding ValidationPipe at the application level,
  //  thus ensuring all endpoints are protected
  //  from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
