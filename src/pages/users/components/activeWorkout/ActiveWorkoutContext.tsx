import { createContext } from "react";

type handleActiveWorkout = (path: string, value: string) => void;
const ActiveWorkoutContext = createContext<{
  handleChange: handleActiveWorkout;
}>({ handleChange: () => {} });

const ActiveWorkoutSetContext = createContext<{
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}>({ isEditing: false, setIsEditing: () => {} });

export { ActiveWorkoutContext, ActiveWorkoutSetContext };
