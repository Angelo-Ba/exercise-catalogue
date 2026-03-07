import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.schema';

@Injectable()
export default class CategorysRepository {
  constructor(
    @InjectRepository(Category) private entity: Repository<Category>,
  ) {}

  async findById(categoryId: number): Promise<Category | null> {
    return this.entity.findOne({
      where: { id: categoryId },
    });
  }

  async findByName(): Promise<Category[]> {
    return this.entity.query('SELECT category.name FROM CATEGORY');
  }
  // TODO convertire in find paginated by filter (page size)
  async findAll(): Promise<Category[]> {
    return this.entity.find();
  }

  async createAndSave(data: Partial<Category>): Promise<Category> {
    const category = this.entity.create(data);
    return this.entity.save(category);
  }

  async save(category: Category): Promise<Category> {
    return this.entity.save(category);
  }

  async update(
    categoryId: number,
    name: { name: string },
  ): Promise<UpdateResult> {
    return this.entity.update(categoryId, name);
  }

  async remove(category: Category): Promise<void> {
    await this.entity.remove(category);
  }
}
