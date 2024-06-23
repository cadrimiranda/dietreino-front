import { createContext } from "react";
import { User } from "../hooks/useUserList";

export const UserListPageContext = createContext<{
  fetchUsers?: (pageSize?: number, pageNumber?: number) => Promise<void>;
  getUserById?: (id: string) => Promise<void>;
  user?: User;
  clearUser?: () => void;
}>({});
