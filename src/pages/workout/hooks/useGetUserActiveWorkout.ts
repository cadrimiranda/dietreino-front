import { useEffect } from "react";
import { useDoFetch } from "../../../utils/useDoFetch";
import { CachePolicies } from "use-http";
import { Workout } from "../activeWorkout/workoutTypes";

export const useGetUserActiveWorkout = (userId?: string) => {
  const { data, setData, get, loading } = useDoFetch<Workout>({
    method: "get",
    fetchOptions: {
      cachePolicy: CachePolicies.NO_CACHE,
    },
  });

  const fetchActiveWorkout = () => {
    return get(`/user/${userId}/active-workout`);
  };

  useEffect(() => {
    if (!userId) return;

    if (data) return;

    fetchActiveWorkout();
  }, [userId]);

  return {
    activeWorkout: data,
    setActiveWorkout: setData,
    fetchActiveWorkout,
    loading,
  };
};
