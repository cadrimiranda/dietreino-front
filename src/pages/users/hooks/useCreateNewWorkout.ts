import { useDoFetch } from "../../../utils/useDoFetch";
import { Workout } from "../components/activeWorkout/workoutTypes";

const useCreateNewWorkout = () => {
  const { data, loading, error, doFetch } = useDoFetch<Workout>({
    url: "/workout",
    method: "post",
  });

  return { data, loading, error, doFetch };
};

export default useCreateNewWorkout;
