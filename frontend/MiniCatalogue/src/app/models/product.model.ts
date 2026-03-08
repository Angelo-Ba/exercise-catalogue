export interface Product {
  id?: number;
  name: string;
  price: number;
  categoryId?: number;
  tags?: string[];
  createdAt?: string;
}
export interface PaginatedData {
  items: Product[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: {
    status: string;
    data: T;
  };
}
