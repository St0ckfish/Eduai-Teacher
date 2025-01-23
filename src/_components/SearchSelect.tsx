/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

interface SearchableSelectProps {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  error?: string;
  bgColor?: string;
  border?: string;
  isDisabled?: boolean;
  maxHeight?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  bgColor = "bgSecondary",
  border = "border-borderSecondary",
  isDisabled = false,
  maxHeight = "max-h-60",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const getLabel = (value: string | number | undefined) => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : "";
  };

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    onChange("");
  };

  const handleOptionClick = (optionValue: string | number, optionLabel: string) => {
    setSearchTerm(optionLabel);
    setIsOpen(false);
    onChange(optionValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          const selectedOption = filteredOptions[highlightedIndex];
          if (selectedOption) {
            handleOptionClick(selectedOption.value, selectedOption.label);
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const element = listRef.current.children[highlightedIndex] as HTMLElement;
      element.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => !isDisabled && setIsOpen(true)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          className={`w-full rounded-lg border ${border} ${bgColor} p-3 text-textPrimary outline-none transition duration-200 ease-in ${
            error ? "border-error" : ""
          } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
        />
        <div className="absolute inset-y-0 right-3 flex items-center px-2">
          <svg
            className={`h-5 w-4 outline-none ${isDisabled ? "text-gray-400" : "text-textSecondary"}`}
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

        {isOpen && !isDisabled && (
          <ul
            ref={listRef}
            className={`absolute z-10 mt-1 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-bgSecondary ${maxHeight}`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option.value, option.label)}
                  className={`cursor-pointer p-2 ${
                    index === highlightedIndex
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-bgSecondary/75"
                  }`}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-textSecondary">No data found</li>
            )}
          </ul>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SearchableSelect;