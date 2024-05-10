import { useState, useEffect } from "react";
import { CachePolicies, useFetch } from "use-http";
import cloneDeep from "lodash/cloneDeep";
import { Workout } from "./workoutTypes";
import { ActiveWorkoutExerciseSet } from "./ActiveWorkoutExerciseSet";
import { ActiveWorkoutContext } from "./ActiveWorkoutContext";

type ObjKeyString = { [key: string]: string };

const ActiveWorkoutPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const { get } = useFetch(
    "/user/11111111-1111-1111-1111-111111111111/active-workout",
    { cachePolicy: CachePolicies.NO_CACHE }
  );

  useEffect(() => {
    get().then((res) => setActiveWorkout(res));
  }, [get]);

  const handleChangeActiveWorkout = (path: string, value: string) => {
    const pathArray = Array.isArray(path)
      ? path
      : path.split(".").map((segment) => {
          return /^\d+$/.test(segment) ? parseInt(segment, 10) : segment;
        });

    const obj = cloneDeep(activeWorkout) as unknown as ObjKeyString;
    let current: ObjKeyString = obj;

    for (let i = 0; i < pathArray.length; i++) {
      const key = pathArray[i];

      if (i === pathArray.length - 1) {
        current[key] = value;
        break;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      current = current[key];
    }

    setActiveWorkout(obj as unknown as Workout);
  };

  return (
    <ActiveWorkoutContext.Provider
      value={{
        isEditing,
        setIsEditing,
        handleChange: handleChangeActiveWorkout,
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
