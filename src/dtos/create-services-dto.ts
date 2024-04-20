import { Transform } from 'class-transformer'
import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator'
import { transformToDate } from '../helpers/transform'

class CreateServiceDto {
  @IsString()
  public name: string

  @IsDateString()
  @Transform(transformToDate)
  public updatedAt: string

  @IsInt()
  public users: number

  @IsBoolean()
  public status: boolean
}

export default CreateServiceDto
