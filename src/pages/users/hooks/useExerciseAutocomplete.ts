import { useRef, useState } from "react";
import useFetch from "use-http";

const useExerciseAutocomplete = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const { get, loading: fetchLoading } = useFetch();
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

      try {
        setLoading(true);
        const data = await get(`/exercise/autocomplete/${name}`);
        setResults(data);
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return { loading: loading || fetchLoading, results, fetchAutocomplete };
};

export default useExerciseAutocomplete;
