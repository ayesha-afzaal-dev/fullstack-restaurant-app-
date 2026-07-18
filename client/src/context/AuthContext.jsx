import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// ===== OWNER ACCOUNT — sirf yahan se set hota hai, kahin aur se admin nahi ban sakta =====
const OWNER_EMAIL = "owner@ihclouds.com";
const OWNER_PASSWORD = "Clouds@2026"; // yeh apni marzi ka strong password rakh lena

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // App load hote hi: owner account seed karo (agar pehle se na ho), aur saved session load karo
  useEffect(() => {
    const ownerExists = localStorage.getItem(`user_${OWNER_EMAIL}`);
    if (!ownerExists) {
      const ownerAccount = {
        name: "Restaurant Owner",
        email: OWNER_EMAIL,
        password: OWNER_PASSWORD,
        role: "admin",
      };
      localStorage.setItem(`user_${OWNER_EMAIL}`, JSON.stringify(ownerAccount));
    }

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

  // Ab signup se koi bhi HAMESHA sirf "customer" banega — admin kabhi is se nahi banega
  const signup = (name, email, password) => {
    if (email === OWNER_EMAIL) {
      return { success: false, message: "Yeh email reserved hai." };
    }

    const newUser = { name, email, password, role: "customer" };
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