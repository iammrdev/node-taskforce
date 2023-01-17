import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber, Task } from '@taskforce/shared-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, NEW_TASKS_SUBJECT } from './mail.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        name: subscriber.name,
        email: subscriber.email,
      }
    })
  }

  public async sendEmailWithTasks(subscriber: Subscriber, tasks: Task[]) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: NEW_TASKS_SUBJECT,
      template: './new-tasks',
      context: {
        name: subscriber.name,
        tasks,
      }
    })
  }
}
