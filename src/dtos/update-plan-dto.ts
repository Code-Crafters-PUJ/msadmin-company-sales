import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator'

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
  @IsPositive()
  public numAccounts: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  public numServices: number

  @IsOptional()
  @IsString()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string
}

export default UpdatePlanDto
