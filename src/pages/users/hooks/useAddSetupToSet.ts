import { useDoFetch } from "../../../utils/useDoFetch";

export const useAddSetupToSet = (workoutId: string) => {
  const { doFetch } = useDoFetch({
    url: `/workout/${workoutId}/exercise-set`,
    method: "post",
    fetchOptions: {
      method: "POST",
    },
  });

  return { addSetupsToSet: doFetch };
};
