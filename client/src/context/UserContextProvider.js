import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
