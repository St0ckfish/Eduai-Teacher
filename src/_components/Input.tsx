"use client"

import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    register?: UseFormRegisterReturn;
    error?: string | undefined;
    className?: string;
    dir?: string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', dir = 'ltr' ,error, register, className, ...props }) => {
    const [inputType, setInputType] = useState(type);

    const handleTogglePassword = () => {
        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    return (
        <label className={`grid gap-1 text-end w-full ${className}`}> 
            <p className='text-purpleMain font-medium text-start'>{label}</p>
            <div className='relative w-full'>
                <input
                    {...props}
                    type={inputType}
                    {...register}
                    dir={dir}
                    // lang="ar"
                    className={`w-full bg-bgSecondary border border-[#677489] px-4 py-3 outline-none rounded-lg bg-authenticationWhite ${error ? "border border-error" : ""}`}
                />
                {error ? (
                    <small className={"mr-2 text-sm text-error"}>{error}</small>
                    ) : (
                        <small className={"mr-2 text-sm opacity-0"}>No Error</small>
                    )}
                {type === 'password' && (
                    <button
                        type='button'
                        onClick={handleTogglePassword}
                        className='absolute inset-y-0 bottom-6 right-0 flex items-center px-2'
                    >
                        {inputType === 'password' ? (
                            <svg className="h-5 w-5 text-supTitle outline-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 text-supTitle outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </label>
    );
};

export default Input;