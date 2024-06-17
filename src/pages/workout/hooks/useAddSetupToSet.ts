import { useDoFetch } from "../../../utils/useDoFetch";

export const useAddSetupToSet = <T extends object>(workoutId: string) => {
  const { post } = useDoFetch({
    method: "post",
    fetchOptions: {
      method: "POST",
    },
  });

  const addSetupsToSet = (body: T) => {
    return post(`/workout/${workoutId}/exercise-set`, body);
  };

  return { addSetupsToSet };
};
