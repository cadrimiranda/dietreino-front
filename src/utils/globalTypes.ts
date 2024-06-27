import * as dayjs from "dayjs";

export type Pageable<T> = {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  items: Array<T>;
  first: boolean;
  last: boolean;
};

export type LoginResponse = {
  token: string;
  expiresAt: dayjs.Dayjs;
  timeToExpire: number;
  user: {
    id: number;
    name: string;
    lastName: string;
    fullName: string;
    email: string;
  };
};
