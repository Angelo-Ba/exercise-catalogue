import { Product } from 'src/shared/repository/products/entities/product.schema';
import { ProductDto } from '../dto/product.dto';

export default class ProductMapper {
  static toResponse(result: Product): ProductDto {
    return {
      id: result.id,
      name: result.name,
      price: result.price,
      categoryId: result.categoryId,
      tags: result.tags || [],
      createdAt: result.createdAt?.toISOString(),
    };
  }

  static toEntity(result: ProductDto): Partial<Product> {
    return {
      id: result.id,
      name: result.name,
      price: result.price,
      categoryId: result.categoryId,
      tags: result.tags || [],
    };
  }
}
