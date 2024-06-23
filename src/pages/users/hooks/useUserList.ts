import { useState } from "react";
import { Pageable } from "../../../utils/globalTypes";
import { useLoading } from "../../../utils/useLoading";
import axios from "axios";

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
  const [page, setPage] = useState<Pageable<UserList>>(
    {} as Pageable<UserList>
  );

  const { load, loading } = useLoading();
  const [pageable, setPageable] = useState({ pageNumber: 0, pageSize: 10 });

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
