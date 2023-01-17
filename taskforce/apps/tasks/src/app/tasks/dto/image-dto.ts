import { Matches } from 'class-validator';


export class ImageDTO {
  @Matches(/image\/(jpeg|png)$/, { message: 'Image must be jpg or png' })
  public image: string;
}
