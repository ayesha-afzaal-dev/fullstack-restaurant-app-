import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("clouds_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem(`user_${email}`) || "null");
    if (savedUser && savedUser.password === password) {
      setUser(savedUser);
      localStorage.setItem("clouds_user", JSON.stringify(savedUser));
      return { success: true };
    }
    return { success: false, message: "Invalid email ya password" };
  };

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
    setUser(newUser);
    localStorage.setItem("clouds_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("clouds_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}