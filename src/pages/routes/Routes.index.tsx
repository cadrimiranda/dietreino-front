import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../login/Login.index";
import { RootPage } from "../root/RootPage.index";
import { NotFoundPage } from "../notFound/NotFound.index";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootPage />,
    errorElement: <NotFoundPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export { Routes };
