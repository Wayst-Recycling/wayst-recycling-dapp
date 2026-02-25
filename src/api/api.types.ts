export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiError {
  statusCode: number;
  errorMessage: string;
}

export interface RPaginated<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
