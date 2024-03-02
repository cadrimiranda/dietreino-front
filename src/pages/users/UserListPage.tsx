import Table from "antd/lib/table";
import { type TableProps } from "antd";
import { Link } from "react-router-dom";

import { MagnifyingGlass } from "../../components/icons/MagnifyingGlass";
import "./userListPage.scss";
import { CustomIcon } from "../../components/icons";
import { UserForm } from "./components/UserForm";

interface DataRaw {
  id: string;
  name: string;
  dataInicio: string;
  dataExpiracao: string;
  dataProximaConsulta: string;
}

interface DataType extends DataRaw {
  diasExpiracao: number;
  diasProximaConsulta: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Inicio",
    dataIndex: "dataInicio",
    key: "dataInicio",
  },
  {
    title: "Expiração",
    key: "dataExpiracao",
    dataIndex: "dataExpiracao",
  },
  {
    title: "Dias p/ expirar",
    key: "diasExpiracao",
    dataIndex: "diasExpiracao",
  },
  {
    title: "Consulta",
    key: "dataProximaConsulta",
    dataIndex: "dataProximaConsulta",
  },
  {
    title: "Dias p/ consulta",
    key: "diasProximaConsulta",
    dataIndex: "diasProximaConsulta",
  },
  {
    title: "",
    key: "",
    render: (_, record) => {
      return (
        <Link to={`${record.id}`} className="user-list-item-visualize">
          <CustomIcon icon={MagnifyingGlass} color="colorPrimary" />
        </Link>
      );
    },
  },
];

const data: DataRaw[] = [
  {
    id: "1",
    name: "John Brown",
    dataInicio: "10/10/2010",
    dataExpiracao: "11/11/2011",
    dataProximaConsulta: "12/12/2012",
  },
  {
    id: "2",
    name: "Jim Green",
    dataInicio: "10/10/2010",
    dataExpiracao: "11/11/2011",
    dataProximaConsulta: "12/12/2012",
  },
  {
    id: "3",
    name: "Joe Black",
    dataInicio: "10/10/2010",
    dataExpiracao: "11/11/2011",
    dataProximaConsulta: "12/12/2012",
  },
];

const UserListPage = () => {
  const dataSource: DataType[] = data.map((x) => ({
    ...x,
    diasExpiracao: 30,
    diasProximaConsulta: 30,
  }));

  return (
    <div className="user-page">
      <UserForm />
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export { UserListPage };
