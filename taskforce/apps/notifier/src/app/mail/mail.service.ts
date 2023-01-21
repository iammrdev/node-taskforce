import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber, Task } from '@taskforce/shared-types';
import { MailSubject } from './mail.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: MailSubject.AddSubscriber,
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
      subject: MailSubject.NewTasks,
      template: './new-tasks',
      context: {
        name: subscriber.name,
        tasks,
      }
    })
  }
}
