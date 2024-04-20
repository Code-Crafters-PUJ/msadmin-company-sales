import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsPositive, IsString } from 'class-validator'
import { transformToDate } from 'src/helpers/transform'

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
  public planType: string

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
