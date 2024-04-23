import { IsOptional, IsString } from 'class-validator'

class UpdateServiceDto {
  @IsString()
  @IsOptional()
  public name: string
}

export default UpdateServiceDto
