import { IsBoolean, IsIn, IsString } from 'class-validator'

class CreateServiceDto {
  @IsString()
  public name: string

  @IsBoolean()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Desabilitado'])
  public state: string
}

export default CreateServiceDto
