import Table from "antd/lib/table";
import { type TableProps } from "antd";
import { Link } from "react-router-dom";

import "./userListPage.scss";
import { UserForm } from "./UserForm";
import {
  UserList,
  useGetUsersByActivePlanAndWorkout,
} from "../hooks/useUserList";
import { useEffect } from "react";
import { DateUtils } from "../../../utils/dateUtils";
import classNames from "classnames";
import { Icon } from "../../../components/Icon";

const outOfDate = (text: string) => {
  let displayValue = DateUtils.formatDate(text);
  const daysRemaining = DateUtils.getDaysLeft(text);
  if (daysRemaining <= 0) {
    displayValue += " (Vencido)";
  } else {
    displayValue += ` (${daysRemaining} dias restantes)`;
  }

  return displayValue;
};

const colorBasedOnDays = (
  displayValue: string,
  daysRemaining: number,
  daysOffset = [7, 21]
) => {
  const hasBgColor = daysRemaining <= daysOffset[1];

  const cx = classNames({
    "bg-yellow-500":
      daysRemaining > daysOffset[0] && daysRemaining <= daysOffset[1],
    "bg-red-500": daysRemaining <= daysOffset[0],
    "p-1": hasBgColor,
    "rounded-lg": hasBgColor,
    "text-white": hasBgColor,
    "font-bold": hasBgColor,
  });

  return <span className={cx}>{displayValue}</span>;
};

const columns: TableProps<UserList>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: "20%",
    render: (text, record) => (
      <Link
        key={record.id}
        to={`user?userId=${record.id}`}
        className="user-list-item-visualize underline uppercase cursor"
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Inicio",
    dataIndex: "planStart",
    key: "planStart",
    width: "10%",
    render: DateUtils.formatDate,
  },
  {
    title: "Expiração",
    key: "planExpiration",
    dataIndex: "planExpiration",
    render: outOfDate,
  },
  {
    title: "Consulta",
    key: "nextAppointment",
    dataIndex: "nextAppointment",
    width: "10%",
    render: (text) => {
      const displayValue = DateUtils.formatDate(text);
      const daysRemaining = DateUtils.getDaysLeft(text);

      return colorBasedOnDays(displayValue, daysRemaining);
    },
  },
  {
    title: "Validade Treino",
    key: "workoutExpiration",
    dataIndex: "workoutExpiration",
    render: (text) => {
      const daysRemaining = DateUtils.getDaysLeft(text);
      const displayValue = outOfDate(text);

      return colorBasedOnDays(displayValue, daysRemaining);
    },
  },
  {
    title: "",
    key: "",
    width: "5%",
    render: (_, record) => {
      return (
        <Link
          key={record.id}
          to={`user?userId=${record.id}`}
          className="user-list-item-visualize m-auto"
        >
          <Icon iconName="glass" color="colorPrimary" />
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
    <div className="user-page mx-4">
      <UserForm />
      <Table size="small" columns={columns} dataSource={users} />
    </div>
  );
};

export { UserListPage };
