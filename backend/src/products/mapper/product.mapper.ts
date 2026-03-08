import { Product } from 'src/shared/repository/products/entities/product.schema';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export default class ProductMapper {
  static toResponse(result: Product): ProductDto {
    return {
      id: result.id,
      name: result.name || '',
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

  static updateProductToEntity(result: UpdateProductDto): Partial<Product> {
    return {
      name: result.name,
      price: result.price,
      categoryId: result.categoryId,
      tags: result.tags || [],
    };
  }
}
