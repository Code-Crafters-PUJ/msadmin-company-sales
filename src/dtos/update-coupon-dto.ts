import { Transform } from 'class-transformer'
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import { transformToDate } from '../helpers/transform'

class UpdateCouponDto {
  @IsString()
  @IsOptional()
  public companyName: string

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
