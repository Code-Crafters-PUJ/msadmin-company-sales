import { Transform } from 'class-transformer'
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import { transformToDate } from '../helpers/transform'

class CreateBillDto {
  @IsInt()
  public clientId: number

  @IsDateString()
  @Transform(transformToDate)
  public initialDate: string

  @IsDateString()
  @Transform(transformToDate)
  public finalDate: string

  @IsString()
  @IsOptional()
  public planType: string

  @IsNumber()
  @IsOptional()
  public trialId: number

  @IsString()
  public paymentMethod: string

  @IsInt()
  @IsPositive()
  public amount: number

  @IsDateString()
  @Transform(transformToDate)
  public paymentDate: string

  @IsInt()
  public duration: number
}

export default CreateBillDto
