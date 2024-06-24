import { BrowserRouter } from "react-router-dom";
import { MuscularGroupEnum } from "../../../utils/useMuscularGroupEnum";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { ExercisePage } from "../ExercisePage";

export const mockExerciseMG: ExerciseWithMuscularGroup = {
  id: "1",
  name: "Supino",
  description: "Exercício para peitoral",
  url: "https://www.youtube.com/watch?v=123",
  image: "https://www.google.com.br",
  muscularGroup: "CHEST" as unknown as MuscularGroupEnum,
};

export const ExercisePageWithRouter = () => (
  <BrowserRouter>
    <ExercisePage />
  </BrowserRouter>
);
