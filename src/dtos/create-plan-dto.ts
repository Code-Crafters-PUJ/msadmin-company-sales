import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
} from 'class-validator'

class CreatePlanDto {
  @IsString()
  public type: string

  @IsInt({ each: true })
  @IsPositive({ each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
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
