import { Button, message } from "antd";
import { PopconfirmWrapper } from "../../../components/popconfirm/Popconfirm";
import { Icon } from "../../../components/Icon";
import { UserList } from "../hooks/useUserList";
import { useLoading } from "../../../utils/useLoading";
import { Link } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { useContext } from "react";
import { UserListPageContext } from "./UserListPageContext";

const TableUserActions = ({ user }: { user: UserList }) => {
  const { load, loading } = useLoading();
  const { fetchUsers, getUserById } = useContext(UserListPageContext);
  const isUserActive = user.active;

  const handleConfirm = () => {
    const request = isUserActive ? "deactive" : "active";
    load(
      axios.put(`/user/${request}/${user.id}`).then((res) => {
        if (isAxiosError(res)) {
          message.error("Erro ao desativar/desativar aluno");
        } else {
          message.success(
            `Aluno ${isUserActive ? "desativado" : "ativado"} com sucesso`
          );
          fetchUsers?.();
        }
      })
    );
  };

  const popUpTitle = isUserActive ? "Desativar aluno?" : "Ativar aluno?";
  const popUpDescription = isUserActive
    ? "Ao desativar o aluno, ele não poderá mais acessar o sistema."
    : "Ao ativar o aluno, ele poderá acessar o sistema.";

  return (
    <div className="flex justify-around align-center">
      <Link
        key={user.id}
        to={loading ? "" : `user?userId=${user.id}`}
        className="user-list-item-visualize"
        aria-disabled={loading}
      >
        <Icon iconName="glass" color="colorPrimary" />
      </Link>

      <PopconfirmWrapper
        title={popUpTitle}
        description={popUpDescription}
        onConfirm={handleConfirm}
      >
        <Button
          type="primary"
          danger={isUserActive}
          size="small"
          disabled={loading}
          icon={
            <Icon iconName={isUserActive ? "trash" : "check"} width="15px" />
          }
        />
      </PopconfirmWrapper>
      <Button
        size="small"
        type="primary"
        icon={<Icon iconName="pen" width="15px" />}
        onClick={() => getUserById?.(user.id)}
      />
    </div>
  );
};

export { TableUserActions };
