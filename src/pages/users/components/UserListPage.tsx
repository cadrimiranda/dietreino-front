import Table from "antd/lib/table";
import { type TableProps } from "antd";
import { Link } from "react-router-dom";

import { MagnifyingGlass } from "../../../components/icons/MagnifyingGlass";
import "./userListPage.scss";
import { CustomIcon } from "../../../components/icons";
import { UserForm } from "./UserForm";
import {
  UserList,
  useGetUsersByActivePlanAndWorkout,
} from "../hooks/useUserList";
import { useEffect } from "react";

const columns: TableProps<UserList>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Inicio",
    dataIndex: "planStart",
    key: "planStart",
  },
  {
    title: "Expiração",
    key: "planExpiration",
    dataIndex: "planExpiration",
  },
  {
    title: "Consulta",
    key: "nextAppointment",
    dataIndex: "nextAppointment",
  },
  {
    title: "Validade Treino",
    key: "workoutExpiration",
    dataIndex: "workoutExpiration",
  },
  {
    title: "",
    key: "",
    render: (_, record) => {
      return (
        <Link
          key={record.id}
          to={`user?userId=${record.id}`}
          className="user-list-item-visualize"
        >
          <CustomIcon icon={MagnifyingGlass} color="colorPrimary" />
        </Link>
      );
    },
  },
];

const UserListPage = () => {
  const { fetchUsers, users } = useGetUsersByActivePlanAndWorkout();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-page">
      <UserForm />
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export { UserListPage };
