import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { OkResponse } from 'src/common/decorators/swagger/ok-response.decorator';
import { OkResponseVoid } from 'src/common/decorators/swagger/ok-response-void.decorator';
import { ProductSearchDto } from './dto/product-search.dto';
import { ApiQuery } from '@nestjs/swagger';
import { OkResponsePaginated } from 'src/common/decorators/swagger/ok-response-paginated.decorator';
import PaginatedResponseDto from 'src/common/dto/paginated-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/shared/service/categories/categories.service';

@Controller('product')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @OkResponse(ProductDto)
  create(@Body() createProductDto: ProductDto): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Get('/list')
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'sort', enum: ['price', 'created_at'], required: false })
  @ApiQuery({ name: 'order', enum: ['asc', 'desc'], required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  @OkResponsePaginated(ProductDto)
  search(@Query() query: ProductSearchDto) {
    return this.productsService.search(query);
  }

  @Get(':id')
  @OkResponse(ProductDto)
  findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @OkResponseVoid()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    if (
      updateProductDto.categoryId !== null &&
      updateProductDto.categoryId !== undefined
    ) {
      await this.categoriesService.findOne(updateProductDto.categoryId);
    }
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @OkResponseVoid()
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
