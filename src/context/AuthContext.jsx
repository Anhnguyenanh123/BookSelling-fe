import { createContext, useContext, useState } from "react";
import * as AuthService from "../services/AuthServices";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const user = await AuthService.register(userData);

      setCurrentUser(user);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const { token, user } = await AuthService.login(email, password);

      // Save token and user ID to localStorage
      localStorage.setItem("userToken", token.token);
      localStorage.setItem("userId", user.id);

      // Update state
      setUserToken(token.token);
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    // Clear local storage and reset state
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUserToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userToken,
    loginUser,
    registerUser,
    logoutUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
