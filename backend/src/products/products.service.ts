import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import ProductsRepository from 'src/shared/repository/products/products.repository';
import { Product } from 'src/shared/repository/products/entities/product.schema';
import { ErrorEnum } from 'src/common/enum/error.enum';
import ProductMapper from './mapper/product.mapper';
import { ProductDto } from './dto/product.dto';
import { ProductSearchDto } from './dto/product-search.dto';
import PaginatedResponseDto from 'src/common/dto/paginated-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      this.logger.error(`Product with this id ${id} not found.`);
      throw new BadRequestException(ErrorEnum.PRODUCT_NOT_FOUND);
    }
    return ProductMapper.toResponse(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    const partialProduct =
      ProductMapper.updateProductToEntity(updateProductDto);
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

  async search(query: ProductSearchDto): Promise<{
    status: string;
    data: PaginatedResponseDto<ProductDto>;
  }> {
    const [items, total] = await this.productsRepository.search(query);
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const totalPages = Math.ceil(total / size);

    return {
      status: 'OK',
      data: {
        items: items.map(ProductMapper.toResponse),
        pagination: {
          totalRecords: total,
          currentPage: page,
          totalPages,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        },
      },
    };
  }
}
