import { useDoFetch } from "../../../utils/useDoFetch";
import { ExerciseWithMuscularGroup } from "../../users/components/gymWorkout/activeWorkout/workoutTypes";

const useGetExercises = () => {
  const { data, error, loading, get } = useDoFetch<ExerciseWithMuscularGroup[]>(
    { method: "get" }
  );

  const fetchExercises = () => {
    return get("/exercise/getall");
  };

  return {
    fetchExercises,
    exercises: data || [],
    error,
    loading,
  };
};

export { useGetExercises };
