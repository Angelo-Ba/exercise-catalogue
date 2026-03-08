import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import ProductsRepository from 'src/shared/repository/products/products.repository';
import { Product } from 'src/shared/repository/products/entities/product.schema';
import { ErrorEnum } from 'src/common/enum/error.enum';
import ProductMapper from './mapper/product.mapper';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: ProductDto): Promise<ProductDto> {
    const product = await this.productsRepository.createAndSave({
      name: createProductDto.name,
      price: createProductDto.price,
      categoryId: createProductDto.categoryId,
      tags: createProductDto.tags,
    });
    return ProductMapper.toResponse(product);
  }

  async findAll(): Promise<ProductDto[]> {
    const res = await this.productsRepository.findAll();
    return res.map((p) => ProductMapper.toResponse(p));
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      this.logger.error(`Product with this id ${id} not found.`);
      throw new BadRequestException(ErrorEnum.PRODUCT_NOT_FOUND);
    }
    return ProductMapper.toResponse(product);
  }

  async update(id: number, updateProductDto: ProductDto): Promise<void> {
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
