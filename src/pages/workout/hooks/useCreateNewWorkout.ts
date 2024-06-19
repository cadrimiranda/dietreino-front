import { useDoFetch } from "../../../utils/useDoFetch";
import { Workout } from "../activeWorkout/workoutTypes";

type createWorkoutDTO = {
  userToAssign: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

const useCreateNewWorkout = () => {
  const { data, loading, error, post } = useDoFetch<Workout>({
    method: "post",
  });

  const createWorkout = (dto: createWorkoutDTO) => {
    return post("/workout", dto);
  };

  return { data, loading, error, createWorkout };
};

export default useCreateNewWorkout;
