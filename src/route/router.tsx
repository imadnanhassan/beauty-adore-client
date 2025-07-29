import AdminLayout from "@/_components/layout/adminLayout";
import MainLayout from "@/_components/layout/mainLayout";
import HomePage from "@/frontend/pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/frontend/pages/LoginPage/LoginPage";
import RegisterPage from "@/frontend/pages/RegisterPage/RegisterPage";
import CartPage from "@/frontend/pages/CartPage/CartPage";
import CheckoutPage from "@/frontend/pages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "@/frontend/pages/OrderSuccessPage/OrderSuccessPage";
import CustomerDashboard from "@/frontend/CustomerPage/CustomerDashboard/CustomerDashboard";
import ShopPage from "@/frontend/pages/ShopPage/ShopPage";
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
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },

      {
        path: "dashboard",
        element: <CustomerDashboard />,
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
