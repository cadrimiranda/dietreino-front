import { useFetch } from "use-http";

export const useRemoveSetFromSetup = () => {
  const { del } = useFetch({
    method: "DELETE",
  });

  const removeSetFromSetup = (setId: string, setupId: string) => {
    return del(`/exercise-set/${setId}/exercise-setup/${setupId}`);
  };

  return { removeSetFromSetup };
};
