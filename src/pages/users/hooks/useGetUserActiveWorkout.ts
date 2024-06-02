import { useEffect } from "react";
import { useDoFetch } from "../../../utils/useDoFetch";
import { Workout } from "../components/gymWorkout/activeWorkout/workoutTypes";
import { CachePolicies } from "use-http";

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
  }, [userId, data]);

  return {
    activeWorkout: data,
    setActiveWorkout: setData,
    fetchActiveWorkout,
    loading,
  };
};
