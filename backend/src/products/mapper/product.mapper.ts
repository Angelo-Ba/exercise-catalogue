import { Category } from 'src/shared/repository/categories/entities/category.schema';
import { Product } from 'src/shared/repository/products/entities/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

export default class ProductMapper {
  static toResponse(result: Product): CreateProductDto {
    return {
      id: result.id,
      name: result.name,
      price: result.price,
      categoryId: result.categoryId,
      tags: result.tags || [],
      createdAt: result.createdAt?.toISOString(),
    };
  }
}
