import { createContext } from "react";

const ActiveWorkoutSetContext = createContext<{
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleUpdateSet: (name: string, value: string, setupIndex: string) => void;
  handleUpdateExercise: (
    option: { value: string; label: string },
    setupIndex: string
  ) => void;
}>({
  isEditing: false,
  setIsEditing: () => {},
  handleUpdateSet: () => {},
  handleUpdateExercise: () => {},
});

export { ActiveWorkoutSetContext };
