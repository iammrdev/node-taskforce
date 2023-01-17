import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tasks Service')
    .setDescription('API for tasks')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
