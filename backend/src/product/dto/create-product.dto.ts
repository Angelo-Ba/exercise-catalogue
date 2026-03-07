import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  id!: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsDateString()
  @IsOptional()
  createdAt?: string;
}
