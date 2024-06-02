import { useCallback, useEffect } from "react";
import { useDoFetch } from "../../../utils/useDoFetch";
import { Workout } from "../components/gymWorkout/activeWorkout/workoutTypes";

export const useGetUserActiveWorkout = (userId?: string) => {
  const { data, setData, get, loading } = useDoFetch<Workout>({
    method: "get",
  });

  const fetchActiveWorkout = useCallback(() => {
    return get(`/user/${userId}/active-workout`);
  }, [userId, get]);

  useEffect(() => {
    if (!userId) return;

    if (data) return;

    fetchActiveWorkout();
  }, [userId, data, fetchActiveWorkout]);

  return {
    activeWorkout: data,
    setActiveWorkout: setData,
    fetchActiveWorkout,
    loading,
  };
};
