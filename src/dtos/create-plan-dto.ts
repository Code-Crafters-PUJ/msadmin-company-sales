import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator'

class CreatePlanDto {
  @IsString()
  public type: string

  @IsInt()
  @IsPositive()
  public mensualPrice: number

  @IsInt()
  @IsPositive()
  public semestralPrice: number

  @IsInt()
  @IsPositive()
  public anualPrice: number

  @IsString({ each: true })
  public services: string[]

  @IsBoolean()
  public status: boolean
}

export default CreatePlanDto
