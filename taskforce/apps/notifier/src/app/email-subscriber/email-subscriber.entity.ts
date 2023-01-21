import { Entity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<Subscriber> {
  public id: string;
  public email: string;
  public name: string;
  public surname: string;
  public userId: string;
  public notifiedDate?: Date;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.userId = entity.userId;
    this.surname = entity.surname;
    this.name = entity.name;
    this.notifiedDate = entity.notifiedDate;
    this.id = entity.id ?? '';
  }

  public toObject(): Subscriber {
    return {
      _id: this.id ?? '',
      email: this.email,
      name: this.name,
      surname: this.surname,
      userId: this.userId,
      notifiedDate: this.notifiedDate
    };
  }
}
