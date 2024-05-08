import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsPositive } from 'class-validator'
import { transformToDate } from '../helpers/transform'

class CreateCouponDto {
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
