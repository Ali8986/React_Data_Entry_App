import React, { createContext } from "react";
import UseUserData from "./hooks/useUserData";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const userData = UseUserData();
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
