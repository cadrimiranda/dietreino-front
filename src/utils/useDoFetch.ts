import { useState } from "react";
import { ReqMethods, useFetch, UseFetchArgs } from "use-http";

const useDoFetch = <T>(props: {
  url: UseFetchArgs[0];
  fetchOptions?: UseFetchArgs[1];
  method: keyof ReqMethods<object>;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetcher = useFetch<T>(props.url, props.fetchOptions);

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

  return { data, loading, error, doFetch, setData };
};

export { useDoFetch };
