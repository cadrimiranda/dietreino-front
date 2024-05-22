import { useState } from "react";
import { useFetch } from "use-http";

export interface UserList {
  id: string;
  name: string;
  email: string;
  planStart: string;
  planExpiration: string;
  nextAppointment: string;
  workoutExpiration: string;
}

export interface User extends UserList {
  phone: string;
  lastName: string;
  dateOfBirth: string;
  activeWorkoutId?: string;
}

export const useGetUsersByActivePlanAndWorkout = () => {
  const [users, setUsers] = useState<UserList[]>([]);

  const { get, loading } = useFetch<UserList[]>("/user/active-plan-workout", {
    method: "GET",
  });

  const fetchUsers = async () => {
    const users = await get();
    setUsers(users);
  };

  return { users, fetchUsers, loading };
};
