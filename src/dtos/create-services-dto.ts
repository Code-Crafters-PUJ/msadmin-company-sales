import { IsString } from 'class-validator'

class CreateServiceDto {
  @IsString()
  public name: string
}

export default CreateServiceDto
