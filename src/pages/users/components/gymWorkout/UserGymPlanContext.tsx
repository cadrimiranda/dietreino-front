import { createContext } from "react";
import { Workout } from "./activeWorkout/workoutTypes";

const UserGymPlanContext = createContext<{
  activeWorkout: Workout | undefined;
  setActiveWorkout: (workout: Workout) => void;
}>({
  activeWorkout: undefined,
  setActiveWorkout: () => {},
});

export { UserGymPlanContext };
