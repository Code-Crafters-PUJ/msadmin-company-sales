import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

class UpdatePlanDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  public mensualPrice: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public semestralPrice: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public anualPrice: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public users: number

  @IsOptional()
  @IsString({ each: true })
  public services: string[]

  @IsOptional()
  @IsBoolean()
  public status: boolean
}

export default UpdatePlanDto
