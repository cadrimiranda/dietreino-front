import { createContext } from "react";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { FormInstance } from "antd/lib";
import { useGetExercises } from "../hooks/useGetExercises";
import { useExerciseTableActions } from "../hooks/useExerciseTableActions";

type TypeUseGetExercises = ReturnType<typeof useGetExercises>;

type TypeUseExerciseTableActions = ReturnType<typeof useExerciseTableActions>;

type ExerciseTableContextType = {
  dataEditing: ExerciseWithMuscularGroup | null;
  handleDataEditing: (data: ExerciseWithMuscularGroup | null) => void;
  form: FormInstance;
  fetchExercises: TypeUseGetExercises["fetchExercises"];
  handleUpdateList: TypeUseGetExercises["handleUpdateList"];
  onEdit: TypeUseExerciseTableActions["onEdit"];
  onDelete: TypeUseExerciseTableActions["onDelete"];
};

const ExerciseTableContext = createContext<ExerciseTableContextType>(
  {} as ExerciseTableContextType
);

export { ExerciseTableContext };
