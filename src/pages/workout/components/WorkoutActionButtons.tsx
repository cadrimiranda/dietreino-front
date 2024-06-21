import Button from "antd/lib/button";
import { useDeleteWorkout } from "../hooks/useDeleteWorkout";
import { useContext, useEffect } from "react";
import message from "antd/lib/message";
import { LoadingContext } from "../../../components/loading/LoadingContext";
import { Icon } from "../../../components/Icon";
import { PopconfirmWrapper } from "../../../components/popconfirm/Popconfirm";

interface Props {
  handleAdd: () => void;
  handleClearWorkout: () => void;
  workoutId?: string;
  isEditing?: boolean;
  handleEditButton: () => void;
}

const WorkoutActionButtons = ({
  handleAdd,
  workoutId,
  handleClearWorkout,
  isEditing,
  handleEditButton,
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
        size="middle"
      >
        Adicionar {workoutId ? "exercícios" : "treino"}
      </Button>
      {workoutId && (
        <>
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
              size="middle"
            />
          </PopconfirmWrapper>
          <Button
            title="Editar treino"
            disabled={loading}
            icon={
              <Icon iconName={isEditing ? "save" : "pen"} color="colorWhite" />
            }
            data-testid="edit-active-workout"
            type="primary"
            size="middle"
            onClick={handleEditButton}
          />
        </>
      )}
    </>
  );
};

export { WorkoutActionButtons };
