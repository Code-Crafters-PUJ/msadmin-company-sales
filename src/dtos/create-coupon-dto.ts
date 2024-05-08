import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsPositive, IsString } from 'class-validator'
import { transformToDate } from '../helpers/transform'

class CreateCouponDto {
  @IsString()
  public companyName: string

  @IsInt()
  @IsPositive()
  public discount: number

  @IsInt()
  public duration: number

  @IsDateString()
  @Transform(transformToDate)
  public expirationDate: string
}

export default CreateCouponDto
