import { Pageable } from "../../../utils/globalTypes";
import axios from "axios";
import { usePageableState } from "../../../utils/usePageableState";
import { useMainContext } from "../../../mainContext";

export interface UserList {
  id: string;
  name: string;
  email: string;
  planStart: string;
  planExpiration: string;
  nextAppointment: string;
  workoutExpiration: string;
  active: boolean;
}

export interface User extends UserList {
  phone: string;
  lastName: string;
  birthDate: string;
  activeWorkoutId?: string;
  fullName: string;
}

export const useGetUsersByActivePlanAndWorkout = () => {
  const { load, loading, page, pageable, setPage, setPageable } =
    usePageableState<UserList>();
  const { tokenData } = useMainContext();

  const fetchUsers = async (
    pageNumber = pageable.pageNumber,
    pageSize = pageable.pageSize
  ) => {
    load(
      axios
        .get<Pageable<UserList>>(
          `/user/all-by/personal-trainer?trainerId=${tokenData?.user.id}&page=${pageNumber}&size=${pageSize}`
        )
        .then((response) => {
          setPage(response.data);
          setPageable({ pageNumber, pageSize });
        })
    );
  };

  return { userPage: page, fetchUsers, loading, pageable };
};
