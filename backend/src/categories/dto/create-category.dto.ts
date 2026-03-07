import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsNumber()
  id!: number;

  @IsString()
  @IsOptional()
  name?: string;
}
