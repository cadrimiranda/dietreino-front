import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../login/Login.index";
import { Layout } from "../layout/Layout.index";
import { NotFoundPage } from "../notFound/NotFound.index";
import { DashboardPage } from "../dashboard/DashboardPage.index";
import { UserListPage } from "../users/components/UserListPage";
import { UserPage } from "../users/UserPage";
import { ExercisePage } from "../exercise/ExercisePage";

export enum RoutesEnum {
  LOGIN = "/login",
  DASHBOARD = "/",
  EXERCISES = "exercicios",
  USERS = "users",
  USER = "user",
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: RoutesEnum.EXERCISES,
        element: <ExercisePage />,
      },
      {
        path: RoutesEnum.USERS,
        children: [
          {
            path: "",
            element: <UserListPage />,
          },
          {
            path: RoutesEnum.USER,
            children: [
              {
                path: "",
                element: <UserPage />,
              },
            ],
          },
        ],
      },
    ],
    element: <Layout />,
    errorElement: <NotFoundPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export { Routes };
