import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import ProductsRepositoryModule from 'src/shared/repository/products/products.repository.module';

@Module({
  imports: [ProductsRepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
