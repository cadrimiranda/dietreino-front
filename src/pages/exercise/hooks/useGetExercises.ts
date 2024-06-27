import axios from "axios";
import {
  PageableState,
  usePageableState,
} from "../../../utils/usePageableState";
import { ExerciseWithMuscularGroup } from "../../workout/activeWorkout/workoutTypes";
import { URLSearchParams } from "url";

type Props = { name?: string } & Partial<PageableState>;

const useGetExercises = () => {
  const { load, loading, page, pageable, setPage, setPageable } =
    usePageableState<ExerciseWithMuscularGroup>();

  const fetchExercises = (props: Props = {}) => {
    const url = new URLSearchParams();
    const pageNumber = props.pageNumber || pageable.pageNumber;
    const pageSize = props.pageSize || pageable.pageSize;
    url.append("page", pageNumber.toString());
    url.append("size", pageSize.toString());

    if (props.name && props.name.length > 0) {
      url.append("name", props.name);
    }

    return load(
      axios.get("/exercise/getall?" + url.toString()).then((response) => {
        if (!axios.isAxiosError(response)) {
          setPage(response.data);
          setPageable({ ...pageable });
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
