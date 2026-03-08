import { Product } from 'src/shared/repository/products/entities/product.schema';
import { UpdateProductDto } from '../dto/update-product.dto';

export default class ProductMapper {
  static toResponse(result: Product): UpdateProductDto {
    return {
      id: result.id,
      name: result.name,
      price: result.price,
      categoryId: result.categoryId,
      tags: result.tags || [],
      createdAt: result.createdAt?.toISOString(),
    };
  }

  static toEntity(result: UpdateProductDto): Partial<Product> {
    return {
      id: result.id,
      name: result.name,
      price: result.price,
      categoryId: result.categoryId,
      tags: result.tags || [],
    };
  }
}
