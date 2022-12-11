import { Expose } from 'class-transformer';

export class CommentRDO {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: string;
}
