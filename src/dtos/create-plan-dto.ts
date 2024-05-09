import {
  IsIn,
  IsInt,
  IsPositive,
  IsString,
  Min,
  NotEquals,
} from 'class-validator'

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
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string

  @IsInt()
  @Min(-1)
  public numAccounts: number

  @IsInt()
  @Min(-1)
  public numServices: number
}

export default CreatePlanDto
