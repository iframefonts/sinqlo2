
import React, { useState } from 'react';
import { ChevronDownIcon } from '../../constants'; // Assuming icons are here

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpenInitially?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpenInitially = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  return (
    <div className="border-b border-gray-200">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 px-1 text-left font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      {isOpen && (
        <div className="pb-5 px-1">
          <div className="text-gray-600">{children}</div>
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
    items: { id: string; question: string; answer: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="space-y-0">
      {items.map((item) => (
        <AccordionItem key={item.id} title={item.question}>
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
