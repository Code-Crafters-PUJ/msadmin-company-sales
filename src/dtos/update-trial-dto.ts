import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator'

class UpdateTrialDto {
  @IsString()
  @IsOptional()
  public companyName: string

  @IsString()
  @IsOptional()
  public plan: string

  @IsInt()
  @IsPositive()
  @IsOptional()
  public duration: number

  @IsString()
  @IsOptional()
  @IsIn(['En uso', 'Sin uso'])
  public state: string
}

export default UpdateTrialDto
