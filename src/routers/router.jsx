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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <div>About</div> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user", element: <User /> },
      { path: "/orders", element: <Orders /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/manageorders", element: <ManageOrders /> },
      { path: "/managebooks", element: <ManageBooks /> },
      { path: "/manageusers", element: <ManageUsers /> },
    ],
  },
]);

export default router;
