import { Pageable } from "../../../utils/globalTypes";
import axios from "axios";
import { usePageableState } from "../../../utils/usePageableState";

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

const fake_personal = "22222222-2222-2222-2222-222222222222";

export const useGetUsersByActivePlanAndWorkout = () => {
  const { load, loading, page, pageable, setPage, setPageable } =
    usePageableState<UserList>();

  const fetchUsers = async (
    pageNumber = pageable.pageNumber,
    pageSize = pageable.pageSize
  ) => {
    load(
      axios
        .get<Pageable<UserList>>(
          `/user/all-by/personal-trainer?trainerId=${fake_personal}&page=${pageNumber}&size=${pageSize}`
        )
        .then((response) => {
          setPage(response.data);
          setPageable({ pageNumber, pageSize });
        })
    );
  };

  return { userPage: page, fetchUsers, loading, pageable };
};
