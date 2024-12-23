import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password) => {
    try {
      setLoading(true);
      setCurrentUser({ email, password });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      setCurrentUser({ email, password });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    registerUser,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
