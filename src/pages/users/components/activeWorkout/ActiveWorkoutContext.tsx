import { createContext } from "react";

const ActiveWorkoutSetContext = createContext<{
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleUpdateSet: (name: string, value: string, setupIndex: number) => void;
  handleUpdateExercise: (
    option: { value: string; label: string },
    setupIndex: number
  ) => void;
}>({
  isEditing: false,
  setIsEditing: () => {},
  handleUpdateSet: () => {},
  handleUpdateExercise: () => {},
});

export { ActiveWorkoutSetContext };
