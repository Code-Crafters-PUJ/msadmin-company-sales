import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator'
import { transformToDate } from '../helpers/transform'

class UpdateCouponDto {
  @IsInt()
  @IsOptional()
  public clientId: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  public discount: number

  @IsInt()
  @IsOptional()
  public duration: number

  @IsDateString()
  @Transform(transformToDate)
  @IsOptional()
  public expirationDate: string
}

export default UpdateCouponDto
