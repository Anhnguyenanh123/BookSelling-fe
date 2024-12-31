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
import ManageNumber from "../pages/admin/ManageNumbers";
import ManageBooks from "../pages/admin/ManageBooks";
import AddNewBook from "../pages/admin/AddNewBook";
import EditBook from "../pages/admin/EditBook";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";

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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoutes>
        <Dashboard />
      </AdminRoutes>
    ),
    children: [
      {
        path: "manageorders",
        element: (
          <AdminRoutes>
            <ManageOrders />
          </AdminRoutes>
        ),
      },
      {
        path: "managebooks",
        element: (
          <AdminRoutes>
            <ManageBooks />
          </AdminRoutes>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoutes>
            <ManageNumber />
          </AdminRoutes>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <AdminRoutes>
            <AddNewBook />
          </AdminRoutes>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoutes>
            <EditBook />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
