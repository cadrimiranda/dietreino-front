import Table from "antd/lib/table";

import { UserForm } from "../form/UserFormPage";
import { useGetUsersByActivePlanAndWorkout } from "../hooks/useUserList";
import { useEffect } from "react";
import { UserListPageContext } from "./UserListPageContext";
import { userTableColumns } from "./tableColumns";
import { useGetUserById } from "../hooks/useGetUserById";

const UserListPage = () => {
  const {
    fetchUserById,
    loading: userLoading,
    user,
    clearUser,
  } = useGetUserById();
  const {
    fetchUsers,
    userPage,
    loading: usersLoading,
  } = useGetUsersByActivePlanAndWorkout();
  const loading = userLoading || usersLoading;

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserListPageContext.Provider
      value={{ fetchUsers, getUserById: fetchUserById, user, clearUser }}
    >
      <div className="user-page mx-4">
        <UserForm fetchUsers={fetchUsers} />
        <Table
          size="small"
          columns={userTableColumns}
          dataSource={userPage.items}
          loading={loading}
          pagination={{
            total: userPage.totalPages,
            pageSize: userPage.pageSize,
            current: userPage.pageNumber + 1,
            onChange: (page, pageSize) => {
              fetchUsers(page - 1, pageSize);
            },
          }}
        />
      </div>
    </UserListPageContext.Provider>
  );
};

export { UserListPage };
