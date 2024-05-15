import { useFetch } from "use-http";

export const useRemoveSetupFromSet = () => {
  const { del } = useFetch({
    method: "DELETE",
  });

  const removeSetupFromSet = (setId: string, setupId: string) => {
    return del(`/exercise-set/${setId}/exercise-setup/${setupId}`);
  };

  return { removeSetupFromSet };
};
