import { useDoFetch } from "../../../utils/useDoFetch";
import { ExerciseWithMuscularGroup } from "../../users/components/gymWorkout/activeWorkout/workoutTypes";

const useGetExercises = () => {
  const { data, error, loading, get, setData } = useDoFetch<
    ExerciseWithMuscularGroup[]
  >({ method: "get" });

  const fetchExercises = () => {
    return get("/exercise/getall");
  };

  const handleUpdateList = (data: ExerciseWithMuscularGroup) => {
    setData((prev) => prev?.map((e) => (e.id === data.id ? data : e)));
  };

  return {
    fetchExercises,
    exercises: data || [],
    error,
    loading,
    handleUpdateList,
  };
};

export { useGetExercises };
