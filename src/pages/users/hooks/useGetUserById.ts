import axios, { isAxiosError } from "axios";
import { useLoading } from "../../../utils/useLoading";
import { useState } from "react";
import { User } from "./useUserList";

const useGetUserById = () => {
  const { load, loading } = useLoading();
  const [user, setUser] = useState<User>();

  const fetchUserById = async (userId: string) => {
    load(
      axios.get(`/user/${userId}`).then((response) => {
        if (!isAxiosError(response)) setUser(response.data);
      })
    );
  };

  const clearUser = () => setUser(undefined);

  return { fetchUserById, loading, user, clearUser };
};

export { useGetUserById };
