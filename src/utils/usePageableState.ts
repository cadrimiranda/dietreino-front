import { useState } from "react";
import { Pageable } from "./globalTypes";
import { useLoading } from "./useLoading";

export type PageableState = {
  pageNumber: number;
  pageSize: number;
};

const usePageableState = <T>() => {
  const [page, setPage] = useState<Pageable<T>>({} as Pageable<T>);
  const { load, loading } = useLoading();
  const [pageable, setPageable] = useState<PageableState>({
    pageNumber: 0,
    pageSize: 10,
  });

  return { page, setPage, load, loading, pageable, setPageable };
};

export { usePageableState };
