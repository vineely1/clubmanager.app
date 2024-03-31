export interface PagedResponse<T> {
  items: Array<T>;
  total: number;
  pageSize: number;
  pageNo: number;
  totalPages: number;
}
