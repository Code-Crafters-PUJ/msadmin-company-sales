import { Transform } from 'class-transformer'
import { IsBoolean, IsDateString, IsInt, IsString  } from 'class-validator'

class CreateServiceDto {
    @IsString()
    public name: string;
  
    @IsDateString()
    @Transform(({ value }) => new Date(value).toISOString())
    public updatedAt: string
  
    @IsInt()
    public users: number;
  
    @IsBoolean()
    public status: boolean;
}
  
export default CreateServiceDto;