"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const SortByButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([
    "Frontend Development",
    "Backend Development",
    "Full-stack Development",
    "UI/UX Design",
    "Digital Marketing",
    "Data Entry",
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  console.log(selectedOptions);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-[#8c52ff] text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-32"
      >
        <span>Sort By</span>
        {isDropdownOpen ? (
          <ChevronUpIcon className="h-6 w-6"></ChevronUpIcon>
        ) : (
          <ChevronDownIcon className="h-6 w-6"></ChevronDownIcon>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg w-60">
          <div className="">
            <label className="block w-full px-4 py-2 cursor-pointer">
              <input
                type="checkbox"
                value="Frontend Development"
                checked={selectedOptions.includes("Frontend Development")}
                onChange={() => handleOptionToggle("Frontend Development")}
              />
              Frontend Development
            </label>
            <label className="block w-full px-4 py-2">
              <input
                type="checkbox"
                value="Backend Development"
                checked={selectedOptions.includes("Backend Development")}
                onChange={() => handleOptionToggle("Backend Development")}
              />
              Backend Development
            </label>
            <label className="block w-full px-4 py-2">
              <input
                type="checkbox"
                value="Full-stack Development"
                checked={selectedOptions.includes("Full-stack Development")}
                onChange={() => handleOptionToggle("Full-stack Development")}
              />
              Full-stack Development
            </label>
            <label className="block w-full px-4 py-2">
              <input
                type="checkbox"
                value="UI/UX Design"
                checked={selectedOptions.includes("UI/UX Design")}
                onChange={() => handleOptionToggle("UI/UX Design")}
              />
              UI/UX Design
            </label>
            <label className="block w-full px-4 py-2">
              <input
                type="checkbox"
                value="Digital Marketing"
                checked={selectedOptions.includes("Digital Marketing")}
                onChange={() => handleOptionToggle("Digital Marketing")}
              />
              Digital Marketing
            </label>
            <label className="block w-full px-4 py-2">
              <input
                type="checkbox"
                value="Data Entry"
                checked={selectedOptions.includes("Data Entry")}
                onChange={() => handleOptionToggle("Data Entry")}
              />
              Data Entry
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortByButton;
