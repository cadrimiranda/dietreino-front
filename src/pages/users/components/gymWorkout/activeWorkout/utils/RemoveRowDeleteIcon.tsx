import Button from "antd/lib/button";
import { PopconfirmProps } from "antd/lib/popconfirm";
import { CustomIcon, Xmark } from "../../../../../../components/icons";
import { PopconfirmWrapper } from "../../../../../../components/popconfirm/Popconfirm";

export const RemoveRowDeleteIcon = ({
  handleClick,
  hasConfirmDialog,
  onCancel,
  onConfirm,
}: {
  handleClick?: () => void;
  hasConfirmDialog?: boolean;
} & Pick<PopconfirmProps, "onConfirm" | "onCancel">) => {
  const DeleteButton = (
    <Button
      data-testid="remove-row-delete-icon"
      type="primary"
      danger
      onClick={handleClick}
    >
      <CustomIcon width="10px" icon={Xmark} color="colorWhite" />
    </Button>
  );

  if (!hasConfirmDialog) {
    return DeleteButton;
  }

  return (
    <PopconfirmWrapper
      title="Remover exercicio?"
      description="Ao remover o exercicio, ele será excluído desse treino. Deseja continuar?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {DeleteButton}
    </PopconfirmWrapper>
  );
};
