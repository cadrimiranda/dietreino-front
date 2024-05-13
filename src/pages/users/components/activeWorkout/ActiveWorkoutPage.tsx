import { ActiveWorkoutExerciseSet } from "./ActiveWorkoutExerciseSet";
import { useGetUserActiveWorkout } from "../../hooks/useGetUserActiveWorkout";

export type ObjKeyString = { [key: string]: string };

const ActiveWorkoutPage = () => {
  const { activeWorkout, fetchActiveWorkout } = useGetUserActiveWorkout(
    "11111111-1111-1111-1111-111111111111"
  );

  const handleUpdateActiveWorkout = () => {
    fetchActiveWorkout();
  };

  if (!activeWorkout) return null;

  return activeWorkout.exerciseSets.map((exerciseSet) => (
    <ActiveWorkoutExerciseSet
      key={exerciseSet.id}
      exerciseSet={exerciseSet}
      handleUpdateActiveWorkout={handleUpdateActiveWorkout}
    />
  ));
};

export { ActiveWorkoutPage };
