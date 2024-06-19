import { useDoFetch } from "../../../utils/useDoFetch";

const useDeleteWorkout = () => {
  const { del, ...rest } = useDoFetch({ method: "delete" });

  const handleDeleteWorkout = async (id: string) => {
    return del(`/workout/${id}`);
  };

  return { handleDeleteWorkout, ...rest };
};

export { useDeleteWorkout };
