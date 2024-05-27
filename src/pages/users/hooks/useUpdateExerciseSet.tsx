import { ExerciseSet } from "../components/gymWorkout/activeWorkout/workoutTypes";
import { CachePolicies, useFetch } from "use-http";

export const useUpdateExerciseSet = (exerciseSet: ExerciseSet) => {
  const { put } = useFetch(`/exercise-set/${exerciseSet.id}/setup`, {
    cachePolicy: CachePolicies.NO_CACHE,
    method: "PUT",
  });

  const updateExerciseSet = (exerciseSet: ExerciseSet) => {
    const updatedSetDTO = {
      ...exerciseSet,
      exerciseSetupList: exerciseSet.exerciseSetupList.map((setup) => ({
        id: setup.id,
        observation: setup.observation,
        repetitions: setup.repetitions,
        series: setup.series,
        rest: setup.rest,
        exerciseId: setup.exercise.id,
      })),
    };

    return put(updatedSetDTO);
  };

  return { updateExerciseSet };
};
