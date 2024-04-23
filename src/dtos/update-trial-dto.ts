import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator'

class UpdateTrialDto {
  @IsString()
  @IsOptional()
  public type: string

  @IsInt()
  @IsPositive()
  @IsOptional()
  public duration: number
}

export default UpdateTrialDto
