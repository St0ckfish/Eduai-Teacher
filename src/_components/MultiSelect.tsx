// src/_components/MultiSelect.tsx

import React, { useEffect, useRef, useState } from "react";

interface MultiSelectComponentProps {
  value: string[]; // Array of selected values
  onChange: (selected: string[]) => void;
  onBlur?: () => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}


const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  value = [], // Default to empty array if undefined
  onChange,
  onBlur,
  options,
  placeholder = "Select Subjects",
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle the selection of an option
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((val) => val !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="!mt-0 grid items-start font-sans">
      <div className="relative" ref={dropdownRef}>
        <div
          className={`flex cursor-pointer justify-between overflow-hidden text-clip rounded-lg border bg-transparent ${
            error ? "border-error" : "border-borderSecondary"
          } p-3`}
          onClick={toggleDropdown}
          onBlur={onBlur}
          tabIndex={0} // Make div focusable for accessibility
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDropdown();
            }
          }}
        >
          {value.length > 0
            ? options
                .filter((option) => value.includes(option.value))
                .map((option) => option.label)
                .join(", ")
            : placeholder}
          <div>
            <svg
              className="h-5 w-4 text-textSecondary outline-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 max-h-[200px] w-full overflow-y-auto rounded-xl border border-borderPrimary bg-bgPrimary p-3">
            {options.map((option) => (
              <div key={option.value} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  id={option.value}
                  checked={value.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="mr-2 h-4 w-4 cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor={option.value}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Display Validation Error */}
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default MultiSelectComponent;
