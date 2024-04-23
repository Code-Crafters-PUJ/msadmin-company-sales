import { Transform } from 'class-transformer'
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import { transformToDate } from 'src/helpers/transform'

class UpdateCouponDto {
  @IsString()
  @IsOptional()
  public code: string

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
