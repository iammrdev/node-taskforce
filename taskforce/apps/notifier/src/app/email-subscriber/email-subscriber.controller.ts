import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@taskforce/shared-types';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { NotifySubscriberDTO } from './dto/notify-subscriber.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@taskforce/core';

@ApiTags('subscribers')
@Controller('subscribers')
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @EventPattern({ cmd: CommandEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.NewTasks })
  public async notifyUser(dto: NotifySubscriberDTO) {
    console.log({ dto });
    return this.subscriberService.sendEmail(dto);
  }

  @Get('notify/:userId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Notify with new tasks',
  })
  async notify(@Param('userId', MongoIdValidationPipe) userId: string) {
    return this.subscriberService.notify(userId);
  }
}
