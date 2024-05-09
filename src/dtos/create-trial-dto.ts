import { IsIn, IsInt, IsPositive, IsString } from 'class-validator'

class CreateTrialDto {
  @IsString()
  public companyName: string

  @IsString()
  public plan: string

  @IsInt()
  @IsPositive()
  public duration: number

  @IsString()
  @IsIn(['En uso', 'Sin uso'])
  public state: string
}

export default CreateTrialDto
