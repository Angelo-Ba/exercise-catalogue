export interface ApiResponse<T> {
  success: boolean;
  data: {
    status: string;
    data: T;
  };
}
