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
import AddNewBook from "../pages/admin/AddBook/AddNewBook";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import BookDetail from "../pages/home/BookDetail";

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
        path: "/orders/:id",
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
        path: "/books/:id",
        element: <BookDetail />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "manageorders",
    element: <ManageOrders />,
  },
  {
    path: "managebooks",
    element: <ManageBooks />,
  },
  {
    path: "manageusers",
    element: <ManageNumber />,
  },
  {
    path: "add-new-book",
    element: <AddNewBook />,
  },
]);

export default router;
