import Button from "antd/lib/button";
import { Icon } from "../../../../components/Icon";
import { useDeleteWorkout } from "../../hooks/useDeleteWorkout";
import { PopconfirmWrapper } from "../../../../components/popconfirm/Popconfirm";
import { useContext, useEffect } from "react";
import message from "antd/lib/message";
import { LoadingContext } from "../../../../components/loading/LoadingContext";

interface Props {
  handleAdd: () => void;
  handleClearWorkout: () => void;
  workoutId?: string;
}

const UserGymPlanActionButtons = ({
  handleAdd,
  workoutId,
  handleClearWorkout,
}: Props) => {
  const { handleDeleteWorkout, catchError, error, loading } =
    useDeleteWorkout();
  const hasError = catchError !== null || error !== null;
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (hasError) {
      message.error("Erro ao remover treino");
    }
  }, [hasError]);

  const onDelete = () => {
    if (workoutId) {
      handleDeleteWorkout(workoutId).then(handleClearWorkout);
    }
  };

  return (
    <>
      <Button
        onClick={handleAdd}
        disabled={hasError || loading}
        icon={
          <Icon iconName="plus" color="colorWhite" width="1rem" height="1rem" />
        }
        size="large"
      >
        Adicionar {workoutId ? "exercícios" : "treino"}
      </Button>
      {workoutId && (
        <PopconfirmWrapper
          title="Deseja remover o treino?"
          description="Ao remover o treino todos os exercícios serão removidos juntos."
          onConfirm={onDelete}
        >
          <Button
            title="Remover treino"
            danger
            disabled={loading}
            icon={<Icon iconName="trash" color="colorWhite" />}
            data-testid="remove-active-workout"
            type="primary"
            size="large"
          />
        </PopconfirmWrapper>
      )}
    </>
  );
};

export { UserGymPlanActionButtons };
