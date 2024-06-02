import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User } from "./useUserList";
import { useDoFetch } from "../../../utils/useDoFetch";

const useGetUserByQueryParameter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  const { data, get, error, loading } = useDoFetch<User>({
    method: "get",
    fetchOptions: {
      method: "GET",
    },
  });

  useEffect(() => {
    if (userId) {
      get(`/user/${userId}`);
    }
  }, [userId]);

  return { user: data, loading, error };
};

export default useGetUserByQueryParameter;
