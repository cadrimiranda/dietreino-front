import AntdForm from "antd/lib/form";
import Modal, { ModalProps } from "antd/lib/modal";
import { UserFormInputs, FieldType } from "./UserFormInputs";
import axios, { isAxiosError } from "axios";
import { message } from "antd";
import { useLoading } from "../../../utils/useLoading";
import { useEffect, useMemo } from "react";
import { UserRegisterResponse } from "./type";
import { User } from "../hooks/useUserList";
import { DateUtils } from "../../../utils/dateUtils";

const UserFormModal = (
  props: Pick<ModalProps, "onCancel"> & {
    handleClose: (props?: UserRegisterResponse) => void;
    user?: User;
  }
) => {
  const { user } = props;
  const [form] = AntdForm.useForm<FieldType>();
  const { load, loading } = useLoading();

  useEffect(() => {
    if (props.user) {
      form.setFieldsValue({
        ...user,
        birthDate: DateUtils.toDayJS(user?.birthDate),
        planExpiration: DateUtils.toDayJS(user?.planExpiration),
        planStart: DateUtils.toDayJS(user?.planStart),
      });
    }
  }, []);

  const handleAddUser = (data: FieldType) => {
    load(
      axios.post("/auth/register", data).then((response) => {
        if (isAxiosError(response)) {
          message.error(response.data.message);
        } else {
          message.success(`Usuário ${data.name} adicionado com sucesso`);
          props.handleClose({
            ...response.data,
            name: data.name + " " + data.lastName,
          });
        }
      })
    );
  };

  const handleEditUser = (data: FieldType) => {
    load(
      axios.put(`/user/${user?.id}`, data).then((response) => {
        if (isAxiosError(response)) {
          message.error(response.data.message);
        } else {
          message.success(`Usuário ${data.name} editado com sucesso`);
          props.handleClose();
        }
      })
    );
  };

  const handleFinish = () => {
    const data = form.getFieldsValue();
    if (!user) {
      handleAddUser(data);
    } else {
      handleEditUser(data);
    }
  };

  const buttonProps = useMemo(() => ({ disabled: loading }), [loading]);

  return (
    <Modal
      open
      {...props}
      okText="Adicionar"
      cancelButtonProps={buttonProps}
      okButtonProps={{ htmlType: "submit", form: "userform", ...buttonProps }}
      width="50%"
      onOk={() => form.submit()}
      onCancel={props.onCancel}
    >
      <UserFormInputs
        disabled={loading}
        form={form}
        onFinish={handleFinish}
        user={user}
      />
    </Modal>
  );
};

export { UserFormModal };
