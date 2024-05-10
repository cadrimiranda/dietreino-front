import { ActiveWorkoutExerciseSet } from "./ActiveWorkoutExerciseSet";
import { ActiveWorkoutContext } from "./ActiveWorkoutContext";
import { useGetUserActiveWorkout } from "../../hooks/useGetUserActiveWorkout";
import { handleChangeActiveWorkout } from "./ActiveWorkoutPage.logic";

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

  return (
    <ActiveWorkoutContext.Provider
      value={{
        handleChange,
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
