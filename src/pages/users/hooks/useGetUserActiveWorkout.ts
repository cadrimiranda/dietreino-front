import { useEffect } from "react";
import { useDoFetch } from "../../../utils/useDoFetch";
import { Workout } from "../components/gymWorkout/activeWorkout/workoutTypes";

export const useGetUserActiveWorkout = (userId?: string) => {
  const { data, setData, doFetch, loading } = useDoFetch<Workout>({
    url: `/user/${userId}/active-workout`,
    method: "get",
  });

  useEffect(() => {
    if (!userId) return;

    if (data) return;

    doFetch();
  }, [userId, data]);

  return {
    activeWorkout: data,
    setActiveWorkout: setData,
    fetchActiveWorkout: doFetch,
    loading,
  };
};
