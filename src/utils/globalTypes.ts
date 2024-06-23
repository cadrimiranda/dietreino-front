export type Pageable<T> = {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  items: Array<T>;
  first: boolean;
  last: boolean;
};
