import Button from "antd/lib/button";
import { ExerciseSet, Workout } from "../workoutTypes";
import { Icon } from "../../../../../../components/Icon";
import { useDeleteExerciseSet } from "../../../../hooks/useDeleteExerciseSet";
import { useContext } from "react";
import { UserGymPlanContext } from "../../UserGymPlanContext";

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
  const { setActiveWorkout, activeWorkout } = useContext(UserGymPlanContext);
  const { deleteExerciseSet, isDeleting } = useDeleteExerciseSet();

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    deleteExerciseSet(exerciseSet.id!).then(() => {
      setActiveWorkout({
        ...activeWorkout,
        exerciseSets: activeWorkout?.exerciseSets.filter(
          (set) => set.id !== exerciseSet.id
        ),
      } as Workout);
    });
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
