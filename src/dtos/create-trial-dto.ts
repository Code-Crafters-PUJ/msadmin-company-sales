import { IsIn, IsInt, IsPositive, IsString } from 'class-validator'

class CreateTrialDto {
  @IsString()
  public plan: string

  @IsInt()
  @IsPositive()
  public duration: number

  @IsString()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string
}

export default CreateTrialDto
