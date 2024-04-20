import { Transform } from 'class-transformer'
import { IsDateString, IsInt, IsString, IsPositive } from 'class-validator'

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
  @Transform(({ value }) => new Date(value).toISOString())
  public expirationDate: string
}

export default CreateCouponDto
