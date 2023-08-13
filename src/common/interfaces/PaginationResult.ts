export interface PaginationResult<T extends object> {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  items: T[];
}
