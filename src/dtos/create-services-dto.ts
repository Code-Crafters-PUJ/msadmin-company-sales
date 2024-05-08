import { IsBoolean, IsString } from 'class-validator'

class CreateServiceDto {
  @IsString()
  public name: string

  @IsBoolean()
  public state: boolean
}

export default CreateServiceDto
