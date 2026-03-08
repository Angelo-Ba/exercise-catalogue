import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import ProductsRepositoryModule from 'src/shared/repository/products/products.repository.module';
import CategoriesServiceModule from 'src/shared/service/categories/categories.service.module';

@Module({
  imports: [ProductsRepositoryModule, CategoriesServiceModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
