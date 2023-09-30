export interface PaginationResult<T extends object> {
  page: number;
  itemsPerPage: number;
  totalRecords: number;
  totalPages: number;
  items: T[];
}
