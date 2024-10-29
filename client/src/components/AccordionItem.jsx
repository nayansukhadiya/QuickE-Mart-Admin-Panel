import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AccordionItem({ title, content, link, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item mb-2">
      {link ? ( // Check if there's a direct link
        <Link 
          to={link} 
          className="w-full text-left p-4 flex items-center mainColor focus:outline-none rounded-lg"
        >
          <span className="mr-2" dangerouslySetInnerHTML={{ __html: icon }} />
          {title}
        </Link>
      ) : (
        <>
          <button 
            className="w-full text-left p-4 flex items-center mainColor focus:outline-none rounded-lg"
            onClick={toggleAccordion}
          >
            <span className="mr-2" dangerouslySetInnerHTML={{ __html: icon }} />
            {title}
          </button>
          <div className={`accordion-content overflow-hidden transition-max-height duration-300 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
            <ul className="list-disc list-inside pl-4 mt-1">
              {content.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className="text-blue-500 hover:underline">
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
