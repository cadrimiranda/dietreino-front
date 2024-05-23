import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User } from "./useUserList";
import { useDoFetch } from "../../../utils/useDoFetch";

const useGetUserByQueryParameter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  const { data, doFetch, error, loading } = useDoFetch<User>({
    url: `/user/${userId}`,
    method: "get",
    fetchOptions: {
      method: "GET",
    },
  });

  useEffect(() => {
    if (userId) {
      doFetch();
    }
  }, [userId]);

  return { user: data, loading, error };
};

export default useGetUserByQueryParameter;
