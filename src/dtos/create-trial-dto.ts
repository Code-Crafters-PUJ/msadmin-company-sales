import { IsInt, IsPositive, IsString } from 'class-validator'

class CreateTrialDto {
  @IsString()
  public type: string

  @IsInt()
  @IsPositive()
  public duration: number
}

export default CreateTrialDto
