// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext<any>({});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>();

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(undefined);
  };

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
