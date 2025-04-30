'use client';

import React, { useState } from 'react';

type DropdownSelectProps<T extends string> = {
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function DropdownSelect<T extends string>({
  options,
  selected,
  onSelect,
}: DropdownSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8">
      <button
        className="w-full h-12 border border-gray-300 rounded-2xl px-5 py-3 pr-10 cursor-pointer text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected}
        <img
            src="/images/dropdown.svg"
            alt="드롭다운 세모 아이콘"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-2xl z-10">
          {options.map((option) => (
            <li
              key={option}
              className="m-[6px] px-4 py-2 bg-white rounded-2xl hover:bg-[#F3E7E6] hover:text-garnet cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}