export type MuscularGroup = {
  id: string;
  name: string;
};

export type ExerciseWithMuscularGroup = Exercise & {
  muscularGroup: MuscularGroup;
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
