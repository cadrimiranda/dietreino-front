import { ExerciseSet } from "../components/activeWorkout/workoutTypes";
import { CachePolicies, useFetch } from "use-http";

export const useUpdateExerciseSet = (exerciseSet: ExerciseSet) => {

  const { put } = useFetch(
    `/exercise-set/${exerciseSet.id}/setup`,
    { cachePolicy: CachePolicies.NO_CACHE, method: "PUT" }
  );

  return { updateExerciseSet: put };
}