import { IsIn, IsOptional, IsString } from 'class-validator'

class UpdateServiceDto {
  @IsString()
  @IsOptional()
  public name: string

  @IsString()
  @IsOptional()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Desabilitado'])
  public state: string
}

export default UpdateServiceDto
