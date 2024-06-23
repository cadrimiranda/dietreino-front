import { type TableProps } from "antd";
import { Link } from "react-router-dom";

import { UserList } from "../hooks/useUserList";
import { DateUtils } from "../../../utils/dateUtils";
import { TableUserActions } from "./TableUserActions";
import {
  tableCellRender,
  WITHOUT_NEXT_APPOINTMENT,
  WITHOUT_PLAN_EXPIRATION,
} from "../userpage.logic";
import { Icon } from "../../../components/Icon";

export const userTableColumns: TableProps<UserList>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: "15%",
    render: (text, record) => (
      <Link
        key={record.id}
        to={`user?userId=${record.id}`}
        className="underline uppercase cursor"
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
    render: (text) => tableCellRender(text, WITHOUT_PLAN_EXPIRATION),
  },
  {
    title: "Consulta",
    key: "nextAppointment",
    dataIndex: "nextAppointment",
    render: (text) => tableCellRender(text, WITHOUT_NEXT_APPOINTMENT),
  },
  {
    title: "Validade Treino",
    key: "workoutExpiration",
    dataIndex: "workoutExpiration",
    render: (text) => tableCellRender(text),
  },
  {
    title: "Ativo",
    key: "active",
    dataIndex: "active",
    width: "5%",
    render: (text) => (
      <div
        className="cursor-help"
        title={text ? "usuário ativo" : "usuário inativo"}
      >
        <Icon
          iconName={text ? "check" : "xmark"}
          color={text ? "green-5" : "red-5"}
        />
      </div>
    ),
  },
  {
    title: "",
    key: "",
    width: "10%",
    render: (_, record) => {
      return <TableUserActions user={record} />;
    },
  },
];
