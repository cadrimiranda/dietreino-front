import { useDoFetch } from "../../../utils/useDoFetch";
import { ExerciseSet } from "../activeWorkout/workoutTypes";

export const useUpdateExerciseSet = () => {
  const { put } = useDoFetch<ExerciseSet>({
    method: "put",
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

    return put(`/exercise-set/${exerciseSet.id}/setup`, updatedSetDTO);
  };

  return { updateExerciseSet };
};
