import { createContext } from "react";

type handleActiveWorkout = (path: string, value: string) => void;
const ActiveWorkoutContext = createContext<{
  isEditing: boolean;
  handleChange: handleActiveWorkout;
  setIsEditing: (value: boolean) => void;
}>({ isEditing: false, handleChange: () => {}, setIsEditing: () => {} });

export { ActiveWorkoutContext };
