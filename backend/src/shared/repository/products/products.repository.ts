import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.schema';
import { ProductSearchDto } from 'src/products/dto/product-search.dto';

@Injectable()
export default class ProductsRepository {
  constructor(@InjectRepository(Product) private entity: Repository<Product>) {}

  async findById(productId: number): Promise<Product | null> {
    return this.entity.findOne({
      where: { id: productId },
    });
  }

  async findByName(): Promise<Product[]> {
    return this.entity.query('SELECT product.name FROM PRODUCT');
  }

  async createAndSave(data: Partial<Product>): Promise<Product> {
    const product = this.entity.create(data);
    return this.entity.save(product);
  }

  async save(product: Product): Promise<Product> {
    return this.entity.save(product);
  }

  async update(
    productId: number,
    data: Partial<Product>,
  ): Promise<UpdateResult> {
    return this.entity.update(productId, data);
  }

  async remove(product: Product): Promise<void> {
    await this.entity.remove(product);
  }

  async search(query: ProductSearchDto): Promise<[Product[], number]> {
    const qb = this.entity.createQueryBuilder('product');

    if (query.search) {
      qb.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${query.search}%`,
      });
    }

    if (query.categoryId) {
      qb.andWhere('product.category_id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.minPrice) {
      qb.andWhere('product.price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }

    if (query.maxPrice) {
      qb.andWhere('product.price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    if (query.sort) {
      const sortProperty = query.sort === 'createdAt' ? 'created_at' : 'price';

      const orderDirection =
        (query.order?.toUpperCase() as 'ASC' | 'DESC') || 'DESC';
      qb.orderBy(`product."${sortProperty}"`, orderDirection);
    } else {
      qb.orderBy('product."created_at"', 'DESC');
    }
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    qb.skip((page - 1) * size).take(size);
    return qb.getManyAndCount();
  }
}
