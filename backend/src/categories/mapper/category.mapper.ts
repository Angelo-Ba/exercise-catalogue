import { Category } from 'src/shared/repository/categories/entities/category.schema';
import { CreateCategoryDto } from '../dto/create-category.dto';

export default class CategoryMapper {
  static toResponse(result: Category): CreateCategoryDto {
    return {
      id: result.id,
      name: result.name,
    };
  }
}
