import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductsRepository from 'src/shared/repository/products/products.repository';
import { Product } from 'src/shared/repository/products/entities/product.schema';
import { ErrorEnum } from 'src/common/enum/error.enum';
import ProductMapper from './mapper/product.mapper';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.createAndSave({
      name: createProductDto.name,
      price: createProductDto.price,
      categoryId: createProductDto.categoryId,
      tags: createProductDto.tags,
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      this.logger.error(`Product with this id ${id} not found.`);
      throw new BadRequestException(ErrorEnum.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    const partialProduct = ProductMapper.toEntity(updateProductDto);
    await this.productsRepository.update(id, partialProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      this.logger.error(`Product with this id ${id} not found.`);
      throw new BadRequestException(ErrorEnum.PRODUCT_NOT_FOUND);
    }
    return this.productsRepository.remove(product);
  }
}
