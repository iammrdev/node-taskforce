import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constants';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent } from '@taskforce/shared-types';
import { NotifySubscriberDTO } from './dto/notify-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy
  ) { }

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const existedSubscriber = await this.emailSubscriberRepository.findByEmail(subscriber.email);

    if (existedSubscriber) {
      throw new BadRequestException(EMAIL_SUBSCRIBER_EXISTS);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }

  public async sendEmail(dto: NotifySubscriberDTO) {
    const existedSubscriber = await this.emailSubscriberRepository.findById(dto.subscriberId);

    if (!existedSubscriber) {
      throw new BadRequestException('Subscriber not found');
    }

    return this.mailService.sendEmailWithTasks(existedSubscriber, dto.tasks);
  }

  async notify(userId: string) {
    const subscriber = await this.emailSubscriberRepository.findById(userId);

    this.rabbitClient.emit(
      { cmd: CommandEvent.NotifyTasks },
      subscriber
    );

    this.emailSubscriberRepository.update(subscriber._id, new EmailSubscriberEntity({ ...subscriber, notifiedDate: new Date() }));
  }
}
