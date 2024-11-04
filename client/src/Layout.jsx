import React, { useEffect, useContext } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import UserContext from "./context/UserContext";

function Layout() {
  const { isOpen, setIsOpen, isDarkMode } = useContext(UserContext);

  useEffect(() => {
    // Apply dark mode class to the body based on the isDarkMode state
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className={`flex w-full ${isDarkMode ? "dark" : ""}`}>
      <button
        className="md:hidden p-2 text-white bg-blue-600 rounded z-10"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed inset-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:h-screen`}
      >
        <Sidebar onItemClick={closeSidebar} />
      </div>

      <div
        className={`flex-1 py-10 px-16 transition-all duration-300 ease-in-out ${
          isOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
