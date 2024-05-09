import { IsIn, IsOptional, IsString } from 'class-validator'

class UpdateServiceDto {
  @IsString()
  @IsOptional()
  public name: string

  @IsString()
  @IsOptional()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string
}

export default UpdateServiceDto
