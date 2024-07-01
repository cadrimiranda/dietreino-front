import axios from "axios";
import { useState } from "react";

const useLoading = <T>() => {
  const [loading, setLoading] = useState(false);
  const load = (promise: Promise<T>) => {
    setLoading(true);
    return promise.finally(() => setLoading(false));
  };
  return { loading, load };
};

type AxiosResponse<T> = ReturnType<typeof axios.put<T>>;

const useLoadingAxios = <T>() => {
  const [loading, setLoading] = useState(false);
  const load = (promise: AxiosResponse<T>) => {
    setLoading(true);
    return promise.finally(() => setLoading(false));
  };
  return { loading, load };
};

export { useLoading, useLoadingAxios };
