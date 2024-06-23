import Button from "antd/lib/button";
import { Icon } from "../../../components/Icon";
import { UserFormModal } from "./UserFormModal";
import { useContext, useEffect, useState } from "react";
import { UserRegisterResponse } from "./type";
import { UserCreatedModal } from "./UserCreatedModal";
import { UserListPageContext } from "../components/UserListPageContext";

const UserForm = ({ fetchUsers }: { fetchUsers: () => Promise<void> }) => {
  const [userRegisterResponse, setUserRegisterResponse] =
    useState<UserRegisterResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, clearUser } = useContext(UserListPageContext);

  useEffect(() => {
    if (user && !isModalOpen) {
      setIsModalOpen(true);
    }
  }, [user, isModalOpen]);

  const onCloseModal = () => {
    setIsModalOpen(false);
    fetchUsers();
    if (user) {
      clearUser?.();
    }
  };

  const handleCloseModal = (props?: UserRegisterResponse) => {
    onCloseModal();

    if (props) {
      setUserRegisterResponse(props);
    }
  };

  return (
    <div className="flex align-center justify-start mb-2">
      <Button
        title="Adicionar"
        onClick={() => setIsModalOpen(true)}
        disabled={isModalOpen}
        icon={<Icon iconName="plus" width="15px" color="colorWhite" />}
      >
        Adicionar
      </Button>
      {isModalOpen && (
        <UserFormModal
          user={user}
          handleClose={handleCloseModal}
          onCancel={onCloseModal}
        />
      )}
      {userRegisterResponse && (
        <UserCreatedModal
          onClose={() => {
            setUserRegisterResponse(null);
          }}
          {...userRegisterResponse}
        />
      )}
    </div>
  );
};

export { UserForm };
