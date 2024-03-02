import { Flex } from "antd";
import Button from "antd/lib/button";
import AntdForm from "antd/lib/form";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import locale from "antd/es/date-picker/locale/pt_BR";
import Modal, { ModalProps } from "antd/lib/modal";
import { CustomIcon, Plus } from "../../../components/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

type FieldType = {
  nome?: string;
  email?: string;
  dataNascimento?: string;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current >= dayjs().startOf("day");
};

const Form = (props: Pick<ModalProps, "onCancel" | "onOk">) => {
  const [form] = AntdForm.useForm();

  return (
    <Modal
      open
      {...props}
      okText="Adicionar"
      okButtonProps={{ htmlType: "submit", form: "userform" }}
    >
      <AntdForm
        autoComplete="off"
        id="userform"
        layout="vertical"
        form={form}
        onFinish={(values) => alert(values)}
      >
        <AntdForm.Item<FieldType>
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Insira um nome!" }]}
        >
          <Input />
        </AntdForm.Item>
        <AntdForm.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { type: "email", required: true, message: "Insira um email!" },
          ]}
        >
          <Input />
        </AntdForm.Item>
        <AntdForm.Item<FieldType>
          label="Data de nascimento"
          name="dataNascimento"
          rules={[
            { type: "date", required: true, message: "Insira data nascimento" },
          ]}
        >
          <DatePicker
            locale={locale}
            format="DD/MM/YYYY"
            disabledDate={disabledDate}
          />
        </AntdForm.Item>
      </AntdForm>
    </Modal>
  );
};

const UserForm = () => {
  const [isAdding, setIsAdding] = useState(false);

  const onCloseModal = () => {
    setIsAdding(false);
  };

  return (
    <Flex
      justify="flex-end"
      align="flex-end"
      vertical
      flex="1"
      style={{ marginBottom: "8px" }}
    >
      <Button
        title="Adicionar"
        onClick={() => setIsAdding(true)}
        disabled={isAdding}
        icon={
          <CustomIcon
            icon={Plus}
            color="colorWhite"
            width="1rem"
            height="1rem"
          />
        }
      >
        Adicionar
      </Button>
      {isAdding && <Form onCancel={onCloseModal} />}
    </Flex>
  );
};

export { UserForm };
