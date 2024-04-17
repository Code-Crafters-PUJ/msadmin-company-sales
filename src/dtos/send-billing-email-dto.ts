import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

class SendBillingEmailDto {
  @IsOptional()
  @IsEmail()
  public email: string

  @IsOptional()
  @IsInt()
  @IsPositive()
  public clientId: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public nit: number

  @IsString()
  public subject: string

  @IsString()
  public message: string
}

export default SendBillingEmailDto
