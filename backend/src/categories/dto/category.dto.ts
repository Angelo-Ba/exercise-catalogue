import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CategoryDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  id?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;
}
