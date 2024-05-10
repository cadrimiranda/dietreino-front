export type Exercise = {
  id: string;
  name: string;
  description: string;
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
};
