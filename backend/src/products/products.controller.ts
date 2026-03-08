import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { OkResponse } from 'src/common/decorators/swagger/ok-response.decorator';
import { OkResponseVoid } from 'src/common/decorators/swagger/ok-response-void.decorator';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @OkResponse(ProductDto)
  create(@Body() createProductDto: ProductDto): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @OkResponse(ProductDto)
  findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @OkResponseVoid()
  update(
    @Param('id') id: string,
    @Body() updateProductDto: ProductDto,
  ): Promise<void> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @OkResponseVoid()
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
