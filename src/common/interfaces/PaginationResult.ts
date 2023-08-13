export interface PaginationResult<T> {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  items: T[];
}
