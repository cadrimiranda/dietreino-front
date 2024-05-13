import { ActiveWorkoutExerciseSet } from "./ActiveWorkoutExerciseSet";
import { ActiveWorkoutContext } from "./ActiveWorkoutContext";
import { useGetUserActiveWorkout } from "../../hooks/useGetUserActiveWorkout";
import {
  UpdateExerciseParams,
  handleChangeActiveWorkout,
  handleUpdateExerciseOnActiveWorkout,
} from "./ActiveWorkoutPage.logic";
import { Workout } from "./workoutTypes";

export type ObjKeyString = { [key: string]: string };

const ActiveWorkoutPage = () => {
  const { activeWorkout, setActiveWorkout } = useGetUserActiveWorkout(
    "11111111-1111-1111-1111-111111111111"
  );

  const handleChange = (path: string, value: string) => {
    if (!activeWorkout) {
      return;
    }

    setActiveWorkout(handleChangeActiveWorkout(activeWorkout, path, value));
  };

  const handleUpdateExercise = (props: UpdateExerciseParams) => {
    setActiveWorkout(
      handleUpdateExerciseOnActiveWorkout(activeWorkout as Workout, props)
    );
  };

  return (
    <ActiveWorkoutContext.Provider
      value={{
        handleChange,
        handleUpdateExercise,
      }}
    >
      {activeWorkout &&
        activeWorkout.exerciseSets.map((exerciseSet, index) => (
          <ActiveWorkoutExerciseSet
            key={exerciseSet.id}
            exerciseSet={exerciseSet}
            setIndex={index}
          />
        ))}
    </ActiveWorkoutContext.Provider>
  );
};

export { ActiveWorkoutPage };
