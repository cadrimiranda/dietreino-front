import { useRef } from "react";
import { useDoFetch } from "../../../utils/useDoFetch";

export type OptionLabel = { label: string; value: string };

const useExerciseAutocomplete = () => {
  const { doFetch, loading, data } = useDoFetch<OptionLabel[]>({
    url: "/exercise/autocomplete",
    method: "get",
  });
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const clearDebounce = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  const fetchAutocomplete = (name: string) => {
    clearDebounce();

    timeoutId.current = setTimeout(async () => {
      if (name.length < 3) {
        return;
      }

      await doFetch(name);
    }, 1000);
  };

  return { loading, results: data, fetchAutocomplete };
};

export default useExerciseAutocomplete;
