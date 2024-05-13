import { createContext } from "react";
import { UpdateExerciseParams } from "./ActiveWorkoutPage.logic";

type handleActiveWorkout = (path: string, value: string) => void;
const ActiveWorkoutContext = createContext<{
  handleChange: handleActiveWorkout;
  handleUpdateExercise: (a: UpdateExerciseParams) => void;
}>({ handleChange: () => {}, handleUpdateExercise: () => {} });

const ActiveWorkoutSetContext = createContext<{
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}>({ isEditing: false, setIsEditing: () => {} });

export { ActiveWorkoutContext, ActiveWorkoutSetContext };
