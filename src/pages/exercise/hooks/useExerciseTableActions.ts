import axios, { isAxiosError } from "axios";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { ExercisePutDTO } from "../utils/exerciseConverter";
import { useLoadingAxios } from "../../../utils/useLoading";
import { useState } from "react";

const useExerciseTableActions = () => {
  const [error, setError] = useState<unknown | null>(null);
  const { load, loading } = useLoadingAxios();

  const handleEdit = (data: ExercisePutDTO) =>
    load(
      axios.put<ExerciseWithMuscularGroup>(`exercise/${data.id}`, data)
    ).then((res) => {
      if (!isAxiosError(res)) {
        setError(res.data);
        return null;
      }

      return res.data;
    });

  const handleDelete = (id: string) =>
    load(axios.delete(`exercise/${id}`)).then((res) => {
      if (!isAxiosError(res)) {
        setError(res.data);
        return null;
      }

      return res.data;
    });

  return {
    onEdit: handleEdit,
    onDelete: handleDelete,
    error,
    loading,
  };
};

export { useExerciseTableActions };
