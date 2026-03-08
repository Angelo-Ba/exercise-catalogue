import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CategoryDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;
}
