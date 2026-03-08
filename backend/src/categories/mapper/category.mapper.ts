import { Category } from 'src/shared/repository/categories/entities/category.schema';
import { CategoryDto } from '../dto/category.dto';

export default class CategoryMapper {
  static toResponse(result: Category): CategoryDto {
    return {
      id: result.id,
      name: result.name,
    };
  }

  static toEntity(result: CategoryDto): Partial<Category> {
    return {
      id: result.id,
      name: result.name,
    };
  }
}
