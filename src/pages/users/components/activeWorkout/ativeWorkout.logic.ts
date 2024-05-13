import { ExerciseSet } from "./workoutTypes";

export const updateExerciseSetObject = ({
  exerciseSet,
  name,
  value,
  setupIndex,
}: {
  exerciseSet: ExerciseSet;
  name: string;
  value: string;
  setupIndex?: number;
}) => {
  if (setupIndex === undefined) {
    return {
      ...exerciseSet,
      [name]: value,
    };
  }

  return {
    ...exerciseSet,
    exerciseSetupList: exerciseSet.exerciseSetupList.map((setup, index) => {
      if (index === setupIndex) {
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
  setupIndex,
}: {
  exerciseSet: ExerciseSet;
  option: { value: string; label: string };
  setupIndex: number;
}) => {
  return {
    ...exerciseSet,
    exerciseSetupList: exerciseSet.exerciseSetupList.map((setup, index) => {
      if (index === setupIndex) {
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
