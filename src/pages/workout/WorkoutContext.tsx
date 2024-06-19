import { createContext } from "react";
import { Workout } from "./activeWorkout/workoutTypes";

const WorkoutContext = createContext<{
  activeWorkout: Workout | undefined;
  setActiveWorkout: React.Dispatch<React.SetStateAction<Workout | undefined>>;
}>({
  activeWorkout: undefined,
  setActiveWorkout: () => {},
});

export { WorkoutContext };
