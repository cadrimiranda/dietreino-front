import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../login/Login.index";
import { Layout } from "../layout/Layout.index";
import { NotFoundPage } from "../notFound/NotFound.index";
import { DashboardPage } from "../dashboard/DashboardPage.index";
import { UserListPage } from "../users/UserListPage";
import { UserPage } from "../users/UserPage";
import { UserDiet } from "../users/components/UserDiet";

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
            children: [
              {
                path: "",
                element: <UserListPage />,
              },
              {
                path: "user",
                children: [
                  {
                    path: "",
                    element: <UserPage />,
                  },
                  {
                    path: "diet",
                    element: <UserDiet />
                  }
                ],
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
