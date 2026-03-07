import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import CategoriesRepositoryModule from 'src/shared/repository/categories/categories.repository.module';

@Module({
  imports: [CategoriesRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
