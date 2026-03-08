import { ApiProperty } from '@nestjs/swagger';

export default class PaginationDto {
  @ApiProperty()
  totalRecords!: number;
  @ApiProperty()
  currentPage!: number;
  @ApiProperty()
  totalPages!: number;
  @ApiProperty()
  nextPage!: number | null;
  @ApiProperty()
  prevPage!: number | null;
}
