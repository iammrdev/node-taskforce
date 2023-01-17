import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { MailModule } from '../mail/mail.module';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        inject: [ConfigService],
        useFactory: getRabbitMqConfig,
      }
    ]),
    MailModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ],
})
export class EmailSubscriberModule { }
