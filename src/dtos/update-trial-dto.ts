import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator'

class UpdateTrialDto {
  @IsString()
  @IsOptional()
  public plan: string

  @IsInt()
  @IsPositive()
  @IsOptional()
  public duration: number

  @IsString()
  @IsOptional()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string
}

export default UpdateTrialDto
