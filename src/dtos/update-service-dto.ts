import { IsBoolean, IsOptional, IsString } from 'class-validator'

class UpdateServiceDto {
  @IsString()
  @IsOptional()
  public name: string

  @IsBoolean()
  @IsOptional()
  public state: boolean
}

export default UpdateServiceDto
