import { ExerciseSet } from "./workoutTypes";

export const updateExerciseSetObject = ({
  exerciseSet,
  name,
  value,
  setupId,
}: {
  exerciseSet: ExerciseSet;
  name: string;
  value: string;
  setupId?: string;
}) => {
  if (setupId === undefined) {
    return {
      ...exerciseSet,
      [name]: value,
    };
  }

  return {
    ...exerciseSet,
    exerciseSetupList: exerciseSet.exerciseSetupList.map((setup) => {
      if (setup.id === setupId) {
        return {
          ...setup,
          [name]: value,
        };
      }

      return setup;
    }),
  };
};

export const updateExerciseSetExercise = ({
  exerciseSet,
  option,
  setupId,
}: {
  exerciseSet: ExerciseSet;
  option: { value: string; label: string };
  setupId?: string;
}) => {
  return {
    ...exerciseSet,
    exerciseSetupList: exerciseSet.exerciseSetupList.map((setup) => {
      if (setup.id === setupId) {
        return {
          ...setup,
          exercise: {
            ...setup.exercise,
            name: option.label,
            id: option.value,
          },
        };
      }

      return setup;
    }),
  };
};
