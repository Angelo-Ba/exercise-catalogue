import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import CategoriesRepositoryModule from 'src/shared/repository/categories/categories.repository.module';

@Module({
  imports: [CategoriesRepositoryModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export default class CategoriesServiceModule {}
