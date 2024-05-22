import { useEffect, useState } from "react";
import { Workout } from "../components/activeWorkout/workoutTypes";
import { CachePolicies, useFetch } from "use-http";

export const useGetUserActiveWorkout = (userId?: string) => {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const { get } = useFetch(`/user/${userId}/active-workout`, {
    cachePolicy: CachePolicies.NO_CACHE,
  });

  const fetchActiveWorkout = () => get().then(setActiveWorkout);

  useEffect(() => {
    if (!userId) return;

    get().then((res) => setActiveWorkout(res));
  }, [get, userId]);

  return { activeWorkout, setActiveWorkout, fetchActiveWorkout };
};
