import { useFetch } from "use-http";

export const useAddSetupToSet = (workoutId: string) => {
  const { post } = useFetch(`/workout/${workoutId}/exercise-set`, {
    method: "POST",
  });

  return { addSetupsToSet: post };
};
