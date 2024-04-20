import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsString, IsPositive } from 'class-validator'
import { transformToDate } from '../helpers/transform'

class CreateCouponDto {
  @IsString()
  public code: string

  @IsInt()
  public clientId: number

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
