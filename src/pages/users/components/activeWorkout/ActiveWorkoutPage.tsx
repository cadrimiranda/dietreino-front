import { ActiveWorkoutExerciseSet } from "./exerciseSetEdit/ActiveWorkoutExerciseSet";
import { Workout } from "./workoutTypes";

export type ObjKeyString = { [key: string]: string };

const ActiveWorkoutPage = ({ activeWorkout }: { activeWorkout: Workout }) => {
  const handleUpdateActiveWorkout = () => {};

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
