import AdminLayout from "@/_components/layout/adminLayout";
import MainLayout from "@/_components/layout/mainLayout";
import HomePage from "@/frontend/pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/frontend/pages/LoginPage/LoginPage";
import RegisterPage from "@/frontend/pages/RegisterPage/RegisterPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <>Error</>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <>Admin Error</>,
    children: [
      {
        path: "/admin",
        element: <>Admin Home</>,
      },
    ],
  },
]);

export default router;
