import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import Result from "antd/lib/result";

type Props = {
  name: string;
  temporaryPassword: string;
  onClose: () => void;
};

const UserCreatedModal = (props: Props) => (
  <Modal open okText="Ok" width="50%" footer={null}>
    <Result
      status="success"
      title={`Usuário ${props.name} criado com sucesso!`}
      subTitle={`A senha temporária é: ${props.temporaryPassword}. Peça para ${props.name} alterar a senha no primeiro acesso.`}
      extra={
        <Button type="primary" key="console" onClick={props.onClose}>
          Ok
        </Button>
      }
    />
  </Modal>
);

export { UserCreatedModal };
