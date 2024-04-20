import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator'

class CreateTrialDto {
  @IsString()
  public type: string

  @IsInt({ each: true })
  @IsPositive({ each: true })
  public price: number

  @IsInt()
  @IsPositive()
  public users: number

  @IsInt()
  @IsPositive()
  public duration: number

  @IsBoolean()
  public status: boolean
}

export default CreateTrialDto