"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: string | undefined;
  className?: string;
  dir?: string;
  theme?: "solid" | "transparent" | "comment";
  border?: "primary" | "gray" | "none";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"; 
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  dir = "ltr",
  error,
  register,
  className = "",
  theme = "solid",
  border,
  rounded = "lg",
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const themeClasses =
    theme === "transparent"
      ? "bg-transparent"
      : theme === "comment"
      ? "bg-comment rounded-xl"
      : "bg-bgSecondary";

  const borderClass =
      border === "none" ? "" : 
      type === "comment" ? "rounded-2xl" : 
      border === "gray" ? "border border-borderPrimary" : "border border-borderSecondary";
  
  const roundedClass = `rounded-${rounded}`; 

  return (
    <label className={`grid w-full gap-1 text-end`}>
      {label && <p className="text-textPrimary text-start font-medium">{label}</p>}
      <div className="relative w-full">
        <input
          {...props}
          type={inputType}
          {...register}
          dir={dir}
          className={`w-full px-4 py-3 ${
            inputType === "date" ? "mb-1" : ""
          } outline-none text-textPrimary placeholder:text-textSecondary ${
            error ? "border border-error bg-transparent" : `${themeClasses} ${borderClass}`
          } ${roundedClass} ${className}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            aria-label="Toggle password visibility"
            className="absolute inset-y-0 bottom-6 right-0 flex items-center px-2"
          >
            {inputType === "password" ? (
              <svg
                className="h-5 w-5 translate-y-3 text-bgPowderBlue outline-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 translate-y-3 text-bgPowderBlue outline-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </label>
  );
};

export default Input;
