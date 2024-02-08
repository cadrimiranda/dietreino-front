import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../login/Login.index";
import { Layout } from "../layout/Layout.index";
import { NotFoundPage } from "../notFound/NotFound.index";
import { DashboardPage } from "../dashboard/DashboardPage.index";

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
        element: <DashboardPage />
      }
    ],
    element: <Layout />,
    errorElement: <NotFoundPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export { Routes };
