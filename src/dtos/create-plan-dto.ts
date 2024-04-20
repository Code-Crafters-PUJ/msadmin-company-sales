import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator'

class CreatePlanDto {
  @IsString()
  public type: string

  @IsInt({ each: true })
  @IsPositive({ each: true })
  public price: number[]

  @IsInt()
  @IsPositive()
  public users: number

  @IsString({ each: true })
  public services: string[]

  @IsBoolean()
  public status: boolean
}

export default CreatePlanDto
