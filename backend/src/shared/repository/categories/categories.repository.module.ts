import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoriesRepository from './categories.repository';
import { Category } from './entities/category.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesRepository],
  exports: [CategoriesRepository],
})
export default class CategoriesRepositoryModule {}
