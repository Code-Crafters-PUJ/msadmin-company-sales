import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator'

class UpdatePlanDto {
  @IsOptional()
  @IsString()
  public type: string

  @IsOptional()
  @IsInt()
  @IsPositive()
  public mensualPrice: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public semestralPrice: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public anualPrice: number

  @IsOptional()
  @IsInt()
  @Min(-1)
  public numAccounts: number

  @IsOptional()
  @IsInt()
  @Min(-1)
  public numServices: number

  @IsOptional()
  @IsString()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string
}

export default UpdatePlanDto
