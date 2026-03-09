import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import CategoriesRepository from 'src/shared/repository/categories/categories.repository';
import { ErrorEnum } from 'src/common/enum/error.enum';
import { CategoryDto } from 'src/categories/dto/category.dto';
import CategoryMapper from 'src/categories/mapper/category.mapper';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CategoryDto): Promise<CategoryDto> {
    if (
      createCategoryDto.name !== undefined &&
      createCategoryDto.name.trim() === ''
    ) {
      this.logger.error(`Category name is empty.`);
      throw new BadRequestException(ErrorEnum.CATEGORY_NAME_EMPTY);
    }
    const category = await this.categoriesRepository.createAndSave({
      name: createCategoryDto.name,
    });
    return CategoryMapper.toResponse(category);
  }

  async findAll(): Promise<CategoryDto[]> {
    const res = await this.categoriesRepository.findAll();
    return res.map((c) => CategoryMapper.toResponse(c));
  }

  async findOne(id: number): Promise<CategoryDto> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      this.logger.error(`Category with this id ${id} not found.`);
      throw new BadRequestException(ErrorEnum.CATEGORY_NOT_FOUND);
    }
    return CategoryMapper.toResponse(category);
  }

  async update(id: number, updateCategoryDto: CategoryDto): Promise<void> {
    const partialCategory = CategoryMapper.toEntity(updateCategoryDto);
    await this.categoriesRepository.update(id, partialCategory);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      this.logger.error(`Category with this id ${id} not found.`);
      throw new BadRequestException(ErrorEnum.CATEGORY_NOT_FOUND);
    }
    return this.categoriesRepository.remove(category);
  }
}
