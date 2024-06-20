import Button from "antd/lib/button";
import { ExerciseSet, Workout } from "../workoutTypes";
import { useContext } from "react";
import { WorkoutContext } from "../../WorkoutContext";
import { useDeleteExerciseSet } from "../../hooks/useDeleteExerciseSet";
import { Icon } from "../../../../components/Icon";

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
  const { setActiveWorkout, activeWorkout } = useContext(WorkoutContext);
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
    <>
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
          className="ml-2"
          disabled={isDeleting}
          loading={isDeleting}
          onClick={handleDelete}
          data-testid={`delete-set-${exerciseSet.name}`}
        >
          <Icon iconName="trash" color="colorWhite" />
        </Button>
      )}
    </>
  );
};

export { ExerciseSetActionButtons };
