import { useState } from "react";
import {
  CachePolicies,
  FetchData,
  ReqMethods,
  useFetch,
  UseFetchArgs,
} from "use-http";

const useDoFetch = <T extends object>(props: {
  url?: UseFetchArgs[0];
  fetchOptions?: UseFetchArgs[1];
  method: keyof ReqMethods<object>;
}) => {
  const [catchError, setCatcherror] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetcher = useFetch<T>(props.url || "", {
    cachePolicy: CachePolicies.NO_CACHE,
    ...(props.fetchOptions || {}),
  });

  const doFetch = (...fetchProps: unknown[]) => {
    setLoading(true);
    return new Promise<T>((resolve, reject) => {
      // @ts-expect-error - TS doesn't know that props.method is a valid key of ReqMethods
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetcher[props.method](...fetchProps) as Promise<any>)
        .then((res) => {
          setLoading(false);
          if (!res.httpStatus) {
            resolve(res);
            setData(res);
          } else {
            reject(res.message);
            setError(res.message);
          }
        })
        .catch(reject)
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleFetch = (fn: () => Promise<T>) => {
    setData(undefined);
    setError(null);
    setCatcherror(null);

    return new Promise<T>((resolve, reject) => {
      setLoading(true);
      fn()
        .then((response) => {
          if (typeof response === "object") {
            if ("errorMessage" in response) {
              reject(response);
              setError(response.errorMessage as string);
            } else {
              resolve(response);
              setData(response);
            }
          } else {
            resolve(response);
          }
        })
        .catch(setCatcherror)
        .finally(() => setLoading(false));
    });
  };

  const getWrapper = async (url: string) => {
    const { get } = fetcher;
    return handleFetch(() => get(url));
  };

  const postWrapper: FetchData<T> = async (a, b) => {
    const { post } = fetcher;
    return handleFetch(() => post(a, b));
  };

  const putWrapper: FetchData<T> = async (a, b) => {
    const { put } = fetcher;
    return handleFetch(() => put(a, b));
  };

  const deleteWrapper: FetchData<T> = async (a, b) => {
    const { del } = fetcher;
    return handleFetch(() => del(a, b));
  };

  return {
    data,
    loading,
    error,
    doFetch,
    setData,
    get: getWrapper,
    post: postWrapper,
    put: putWrapper,
    del: deleteWrapper,
    catchError,
  };
};

export { useDoFetch };
