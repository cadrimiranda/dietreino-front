import axios from "axios";
import {
  PageableState,
  usePageableState,
} from "../../../utils/usePageableState";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";

type Props = { name?: string } & Partial<PageableState>;

const useGetExercises = () => {
  const { load, loading, page, setPage, concatUrl, createUrl, updatePageable } =
    usePageableState<ExerciseWithMuscularGroup>();

  const fetchExercises = (props: Props = {}) => {
    const url = createUrl(props);

    if (props.name && props.name.length > 0) {
      url.append("name", props.name);
    }

    return load(
      axios.get(concatUrl("/exercise/getall", url)).then((response) => {
        if (!axios.isAxiosError(response)) {
          setPage(response.data);
          const { pageNumber, pageSize } = props;
          updatePageable({ pageNumber, pageSize });
        }
      })
    );
  };

  const handleUpdateList = (data: ExerciseWithMuscularGroup) => {
    setPage((prev) => ({
      ...prev,
      items: prev?.items?.map((e) => (e.id === data.id ? data : e)),
    }));
  };

  return {
    fetchExercises,
    page,
    exercises: page.items || [],
    loading,
    handleUpdateList,
  };
};

export { useGetExercises };
