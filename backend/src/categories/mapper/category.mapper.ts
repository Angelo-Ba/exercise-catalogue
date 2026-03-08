import { Category } from 'src/shared/repository/categories/entities/category.schema';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export default class CategoryMapper {
  static toResponse(result: Category): CreateCategoryDto {
    return {
      id: result.id,
      name: result.name,
    };
  }

  static toEntity(result: UpdateCategoryDto): Partial<Category> {
    return {
      id: result.id,
      name: result.name,
    };
  }
}
