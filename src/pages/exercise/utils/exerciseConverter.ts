import { MuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";
import {
  Exercise,
  ExerciseWithMuscularGroup,
} from "../../workout/activeWorkout/workoutTypes";
import { ExerciseForm } from "../components/ExerciseFormModal";

type ExercisePostDTO = Omit<ExerciseForm, "muscularGroup"> & {
  muscularGroup: MuscularGroupEnum;
};

export type ExercisePutDTO = Exercise & {
  muscularGroup: MuscularGroupEnum;
};

export const exerciseFormToDTO = (data: ExerciseForm): ExercisePostDTO => data;

export const exerciseToEditDTO = (
  data: ExerciseForm & { id: string }
): ExercisePutDTO => {
  return {
    ...data,
    muscularGroup: data.muscularGroup,
  };
};

export const exerciseToForm = (
  exercise: ExerciseWithMuscularGroup
): ExerciseForm => {
  return {
    ...exercise,
    url: exercise.url || "",
    image: exercise.image || "",
    muscularGroup: exercise.muscularGroup,
  };
};
