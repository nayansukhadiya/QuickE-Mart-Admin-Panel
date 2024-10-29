import React, { useContext, useEffect } from "react";
import AccordionItem from "./AccordionItem";
import ThemeToggle from "./ThemeToggle";
import UserContext from "../context/UserContext";

function Sidebar() {
  const { setIsDarkMode } =
    useContext(UserContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkMode = savedTheme === "dark";
    setIsDarkMode(darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [setIsDarkMode]);

  const sections = [
    {
      title: "Order List",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
      content: [
        { name: "Order List", link: "orderlist" },
        { name: "Order Status", link: "orderstatus" },
        { name: "Order Review", link: "ordereview" },
      ],
    },
    {
      title: "Product",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
      content: [{ name: "Product List", link: "productlist" }],
    },
    {
      title: "User",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
      content: [{ name: "User List", link: "userlist" }],
    },
    {
      title: "Settings",
      link: "setting",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    },
    {
      title: "Log in",
      link: "login",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    }
  ];

  return (
    <div className="w-64 p-4 sidebar h-screen flex flex-col justify-between">
      <div className="h-18">Logo</div>
      <div className="flex-grow">
        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            icon={section.icon}
            content={section.content}
            link={section.link} 
          />
        ))}
      </div>
      <div className="mt-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Sidebar;
