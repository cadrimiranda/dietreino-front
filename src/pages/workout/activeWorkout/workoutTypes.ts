import { MuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";
import { WeekDays } from "../../../utils/weekDaysEnum";

export type ExerciseWithMuscularGroup = Exercise & {
  muscularGroup: MuscularGroupEnum;
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  url: string;
  image?: string;
};

export type ExerciseSetup = {
  id: string;
  observation: string;
  repetitions: string;
  rest: string;
  series: string;
  exercise: Exercise;
};

export type ExerciseSet = {
  id: string;
  name: string;
  weekDay: WeekDays;
  description: string;
  exerciseSetupList: ExerciseSetup[];
};

export type Workout = {
  id: string;
  name: string;
  description: string;
  exerciseSets: ExerciseSet[];
  startDate: string;
  endDate: string;
};

export type setupDTO = Omit<ExerciseSetup, "id" | "exercise"> & {
  exerciseId: string;
  exerciseName: string;
};

export type ExerciseSetDTO = Omit<ExerciseSet, "id" | "exerciseSetupList"> & {
  exerciseSetupList: setupDTO[];
};
