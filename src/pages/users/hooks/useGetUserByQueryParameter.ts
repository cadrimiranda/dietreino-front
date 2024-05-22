import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "use-http";
import { User } from "./useUserList";

const useGetUserByQueryParameter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [error, setError] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const userId = searchParams.get("userId");

  const { get } = useFetch(`/user/${userId}`, {
    method: "GET",
  });

  useEffect(() => {
    if (userId) {
      setLoading(true);
      get()
        .then((res) => {
          if (!res.httpStatus) {
            setUser(res);
          } else {
            setError(res.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  return { user, loading, error };
};

export default useGetUserByQueryParameter;
