import React, { useState, useEffect, useRef } from "react";

interface SearchableSelectProps {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  error?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to get label from value
  const getLabel = (value: string | number | undefined) => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : "";
  };

  // Update searchTerm when value changes
  useEffect(() => {
    if (value) {
      const label = getLabel(value);
      setSearchTerm(label);
    } else {
      setSearchTerm("");
    }
  }, [value, options]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    onChange(""); // Clear the form value when typing
  };

  const handleOptionClick = (
    optionValue: string | number,
    optionLabel: string,
  ) => {
    setSearchTerm(optionLabel);
    setIsOpen(false);
    onChange(optionValue);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={onBlur}
          className={`w-full rounded-lg border ${
            error ? "border-error" : "border-borderSecondary"
          } bg-bgSecondary p-3 text-gray-700 outline-none transition duration-200 ease-in`}
        />
        <div className="absolute inset-y-0 right-3 flex items-center px-2">
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

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-bgSecondary">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option.value, option.label)}
                  className="cursor-pointer p-2 hover:bg-bgSecondary/75"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-textSecondary">
                No data found
              </li>
            )}
          </ul>
        )}
      </div>
      {/* Display Validation Error */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SearchableSelect;
