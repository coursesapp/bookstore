import React, { useState } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';

const CustomSelect = ({ data, setoption }) => {
  const [selectedOption, setSelectedOption] = useState(data[0]?.value);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSelect = (option) => {
    setSelectedOption(option?.value);
    setIsOpen(false);
    setoption(option?.value);
  };

  const filteredOptions = data.filter((option) =>
    option?.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-w-[1/4] text-gray-700 relative">
      <div
        className="border rounded-2xl px-4 py-2 flex items-center justify-between cursor-pointer mt-1 w-full p-2 bg-gray-200 border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{data.find((option) => option?.value === selectedOption)?.label}</span>
        <HiOutlineSelector className="text-gray-500 transition-transform duration-300" />
      </div>
      {isOpen && (
        <div className=" absolute w-full mt-1 border  rounded bg-white shadow-lg z-50 ">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border-b border-yellow-300 focus:outline-none"
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.map((option) => (
              <li
                key={option?.value}
                className="text-gray-500 px-4 py-2 hover:bg-[#e8b914] hover:text-white cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option?.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
