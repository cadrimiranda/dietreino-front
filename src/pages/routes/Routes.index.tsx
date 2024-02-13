import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../login/Login.index";
import { Layout } from "../layout/Layout.index";
import { NotFoundPage } from "../notFound/NotFound.index";
import { DashboardPage } from "../dashboard/DashboardPage.index";
import { UserListPage } from "../users/UserListPage";
import { UserPage } from "../users/UserPage";

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
        path: "profissional",
        children: [
          {
            path: "users",
            element: <UserListPage />,
          },
          {
            path: "users/:userId",
            element: <UserPage />,
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
