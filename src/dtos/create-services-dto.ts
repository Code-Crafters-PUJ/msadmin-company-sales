import { IsIn, IsString } from 'class-validator'

class CreateServiceDto {
  @IsString()
  public name: string

  @IsString()
  @IsIn(['Borrador', 'Mantenimiento', 'Publicado', 'Deshabilitado'])
  public state: string
}

export default CreateServiceDto
