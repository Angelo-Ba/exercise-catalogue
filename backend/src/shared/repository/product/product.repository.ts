import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.schema';

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
  // TODO convertire in find paginated by filter (page size)
  async findAll(): Promise<Product[]> {
    return this.entity.find();
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
}
