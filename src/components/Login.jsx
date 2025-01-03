import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);

      if (user?.banned) {
        Swal.fire({
          title: "You have been banned",
          text: "Your account has been banned from the platform.",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      setMessage("Login successful");
      navigate("/"); // Redirect to home page on successful login
    } catch (error) {
      setMessage(error.message);
      alert("Error: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    onSubmit(data);
  };

  return (
    <>
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Please Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            {message && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p>{message}</p>
              </div>
            )}
            <div className="flex flex-wrap space-y-2.5 items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="inline-block align-baseline font-medium mt-4 text-sm">
            Haven't an account? Please
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-800 px-1"
            >
              Register
            </Link>
          </p>
          <p className="mt-5 text-center text-gray-500 text-xs">
            &copy;2025 Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
