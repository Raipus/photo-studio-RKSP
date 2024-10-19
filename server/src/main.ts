import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Cache-Control, Pragma, Expires, Authorization',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder().setTitle('Education API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api_docs', app, document);
  await app.listen(3001);
  await app.setGlobalPrefix('/api');
}
bootstrap();
