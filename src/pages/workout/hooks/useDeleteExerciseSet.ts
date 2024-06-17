import { useDoFetch } from "../../../utils/useDoFetch";

const useDeleteExerciseSet = () => {
  const { del, loading, error, catchError } = useDoFetch({ method: "delete" });

  const deleteExerciseSet = (exerciseSetId: string) => {
    return del(`/exercise-set/${exerciseSetId}`);
  };

  return { deleteExerciseSet, isDeleting: loading, error, catchError };
};

export { useDeleteExerciseSet };
