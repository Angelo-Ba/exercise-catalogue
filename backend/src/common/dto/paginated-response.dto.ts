import type PaginationDto from './pagination.dto';

export default class PaginatedResponseDto<T> {
  items!: T[];
  pagination!: PaginationDto;
}
