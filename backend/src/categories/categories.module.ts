import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import CategoriesRepositoryModule from 'src/shared/repository/categories/categories.repository.module';
import CategoriesServiceModule from 'src/shared/service/categories/categories.service.module';

@Module({
  imports: [CategoriesRepositoryModule, CategoriesServiceModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
