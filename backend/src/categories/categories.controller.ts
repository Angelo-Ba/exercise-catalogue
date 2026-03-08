import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { OkResponseVoid } from 'src/common/decorators/swagger/ok-response-void.decorator';
import { OkResponse } from 'src/common/decorators/swagger/ok-response.decorator';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @OkResponse(CategoryDto)
  create(@Body() createCategoryDto: CategoryDto): Promise<CategoryDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @OkResponse(CategoryDto)
  findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @OkResponseVoid()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CategoryDto,
  ): Promise<void> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @OkResponseVoid()
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(+id);
  }
}
