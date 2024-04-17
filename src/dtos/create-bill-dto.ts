import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsPositive, IsString } from 'class-validator'

class CreateBillDto {
  @IsInt()
  public clientId: number

  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  public initialDate: string

  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  public finalDate: string

  @IsString()
  public planType: string

  @IsString()
  public paymentMethod: string

  @IsInt()
  @IsPositive()
  public amount: number

  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  public paymentDate: string

  @IsInt()
  public duration: number
}

export default CreateBillDto
