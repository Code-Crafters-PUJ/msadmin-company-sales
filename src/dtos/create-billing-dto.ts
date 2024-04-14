import { IsInt } from 'class-validator'

export class CreateBillingDto {
  @IsInt()
  public clientId: number

  constructor(any: any) {
    this.clientId = any.clientId
  }
}
