import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckOut from "../pages/books/CheckOut";
import Dashboard from "../pages/admin/Dashboard";
import User from "../pages/home/User";
import Orders from "../pages/home/Orders";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageBooks from "../pages/admin/ManageBooks";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <div>About</div> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/user",
        element: (
          <PrivateRoutes>
            <User />
          </PrivateRoutes>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoutes>
            <Orders />
          </PrivateRoutes>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoutes>
            <CartPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <CheckOut />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/manageorders",
        element: (
          <PrivateRoutes>
            <ManageOrders />
          </PrivateRoutes>
        ),
      },
      {
        path: "/managebooks",
        element: (
          <PrivateRoutes>
            <ManageBooks />
          </PrivateRoutes>
        ),
      },
      {
        path: "/manageusers",
        element: (
          <PrivateRoutes>
            <ManageUsers />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
