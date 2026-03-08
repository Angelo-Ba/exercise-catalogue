import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  id?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  categoryId?: number;

  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  tags?: string[];

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  createdAt?: string;
}
