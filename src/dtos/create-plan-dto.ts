import { IsIn, IsInt, IsPositive, IsString, NotEquals } from 'class-validator'

class CreatePlanDto {
  @IsString()
  public type: string

  @IsInt()
  @IsPositive()
  @NotEquals(0)
  public mensualPrice: number

  @IsInt()
  @IsPositive()
  @NotEquals(0)
  public semestralPrice: number

  @IsInt()
  @IsPositive()
  @NotEquals(0)
  public anualPrice: number

  @IsString()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Desabilitado'])
  public state: string
}

export default CreatePlanDto
