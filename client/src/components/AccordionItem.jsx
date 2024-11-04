import React, { useState } from "react";
import { Link } from "react-router-dom";

function AccordionItem({ title, content, link, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(false);
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`accordion-item mb-2 opacity-70 hover:opacity-100 transition-opacity duration-300  ${
        isOpen ? "opacity-100" : "opacity-70"
      }`}
    >
      {link ? ( // Check if there's a direct link
        <Link
          to={link}
          className="w-full text-left py-2 flex items-center focus:outline-none rounded-lg"
        >
          <span className="mr-2" dangerouslySetInnerHTML={{ __html: icon }} />
          {title}
        </Link>
      ) : (
        <>
          <button
            className="w-full text-left px-0 py-2 flex items-center focus:outline-none rounded-lg"
            onClick={toggleAccordion}
          >
            <span className="mr-2" dangerouslySetInnerHTML={{ __html: icon }} />
            <p className="w-full flex justify-between">
              {title}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </p>
          </button>
          <div
            className={`accordion-content overflow-hidden transition-max-height duration-300 ${
              isOpen ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="list-disc list-inside pl-4 mt-1">
              {content.map((item, index) => (
                <li key={index} className="list-none py-2 px-4">
                  <Link to={item.link} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default AccordionItem;
