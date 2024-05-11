import cloneDeep from "lodash/cloneDeep";
import { ObjKeyString } from "./ActiveWorkoutPage";
import { Workout } from "./workoutTypes";

export const handleChangeActiveWorkout = (
  activeWorkout: Workout,
  path: string,
  value: string
): Workout => {
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

  return obj as unknown as Workout;
};