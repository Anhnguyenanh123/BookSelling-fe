import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUserById } from "../redux/features/user/userSlice";

const AdminRoutes = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, token, userId]);

  if (!token || !userId) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user?.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet>{children}</Outlet>;
};

export default AdminRoutes;
