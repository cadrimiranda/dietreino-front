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

  const updatePageable = (props: Partial<PageableState>) => {
    setPageable((prev) => {
      return {
        pageNumber: props.pageNumber || prev.pageNumber,
        pageSize: props.pageSize || prev.pageSize,
      };
    });
  };

  const concatUrl = (baseUrl: string, params: URLSearchParams) => {
    return `${baseUrl}?${params.toString()}`;
  };

  const createUrl = (props: Partial<PageableState>) => {
    const url = new URLSearchParams();
    let pageNumber = pageable.pageNumber;
    if (props.pageNumber !== undefined && props.pageNumber >= 0) {
      pageNumber = props.pageNumber;
    }
    const pageSize = props.pageSize || pageable.pageSize;
    url.append("page", pageNumber.toString());
    url.append("size", pageSize.toString());
    return url;
  };

  return {
    page,
    setPage,
    load,
    loading,
    pageable,
    setPageable,
    createUrl,
    concatUrl,
    updatePageable,
  };
};

export { usePageableState };
