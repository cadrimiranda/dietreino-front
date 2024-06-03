import Button from "antd/lib/button";
import { ExerciseSet } from "../workoutTypes";
import { Icon } from "../../../../../../components/Icon";
import { useDeleteExerciseSet } from "../../../../hooks/useDeleteExerciseSet";

type Props = {
  exerciseSet: ExerciseSet;
  isEditing: boolean;
  onEdit: () => void;
};

const ExerciseSetActionButtons = ({
  exerciseSet,
  onEdit,
  isEditing,
}: Props) => {
  const { deleteExerciseSet, isDeleting } = useDeleteExerciseSet();

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    deleteExerciseSet(exerciseSet.id!);
  };

  return (
    <div className="exercise-set-action-buttons">
      <Button
        disabled={isDeleting}
        loading={isDeleting}
        data-testid={`edit-set-${exerciseSet.name}`}
        onClick={handleEdit}
      >
        <Icon
          iconName={isEditing ? "save" : "pen"}
          data-testid={isEditing ? "save-icon" : "edit-icon"}
          color="colorWhite"
        />
      </Button>
      {exerciseSet.id && isEditing && (
        <Button
          disabled={isDeleting}
          loading={isDeleting}
          onClick={handleDelete}
          data-testid={`delete-set-${exerciseSet.name}`}
        >
          <Icon iconName="trash" color="colorWhite" />
        </Button>
      )}
    </div>
  );
};

export { ExerciseSetActionButtons };
