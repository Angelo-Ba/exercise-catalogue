import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategorysRepository from './category.repository';
import { Category } from './entities/category.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategorysRepository],
  exports: [CategorysRepository],
})
export default class CategorysRepositoryModule {}
