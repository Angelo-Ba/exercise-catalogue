import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsRepository from './product.repository';
import { Product } from './entities/product.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsRepository],
  exports: [ProductsRepository],
})
export default class ProductsRepositoryModule {}
