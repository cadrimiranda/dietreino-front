import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const load = (promise: Promise<unknown>) => {
    setLoading(true);
    return promise.finally(() => setLoading(false));
  };
  return { loading, load };
};

export { useLoading };
