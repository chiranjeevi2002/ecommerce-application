import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: sessionStorage.getItem("token"),
    userId: sessionStorage.getItem("userId"),
    storeId: sessionStorage.getItem("storeId"),
    username: sessionStorage.getItem("username"),
    roles: sessionStorage.getItem("roles")

  });

  const login = (data) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data.userId);
    sessionStorage.setItem("storeId", data.storeId);
    sessionStorage.setItem("username", data.username);
    sessionStorage.setItem("roles", data.roles);
    
    setAuth(data);
  };

  const logout = () => {
    sessionStorage.clear();
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
