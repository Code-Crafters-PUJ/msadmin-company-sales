import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator'

class UpdatePlanDto {
  @IsOptional()
  @IsString()
  public type: string

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
  @IsString({ each: true })
  public services: string[]
}

export default UpdatePlanDto
