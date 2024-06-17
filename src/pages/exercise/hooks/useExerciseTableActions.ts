import { useDoFetch } from "../../../utils/useDoFetch";
import { ExerciseWithMuscularGroup } from "../../users/components/gymWorkout/activeWorkout/workoutTypes";
import { ExercisePutDTO } from "../utils/exerciseConverter";

const useExerciseTableActions = () => {
  const { del, put, error, catchError, loading } =
    useDoFetch<ExerciseWithMuscularGroup>({
      showMessages: true,
    });

  const onEdit = (data: ExercisePutDTO) => {
    return put(`exercise/${data.id}`, data);
  };

  const onDelete = (id: string) => {
    return del(`exercise/${id}`);
  };

  return { onEdit, onDelete, error: catchError || error, loading };
};

export { useExerciseTableActions };
