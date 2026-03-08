import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
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
}
