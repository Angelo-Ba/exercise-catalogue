export interface Product {
  id?: number;
  name: string;
  price: number;
  categoryId?: number;
  tags?: string[];
  createdAt?: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  lastPage: number;
}
