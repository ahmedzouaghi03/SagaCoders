"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: "dark" | "light";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, variant = "dark", className = "", ...props }, ref) => {
    const isDark = variant === "dark";

    return (
      <div className="w-full">
        {label && (
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-[#202C4B]"
            } font-roboto`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full h-[38px] px-4 ${icon ? "pr-10" : ""} 
              rounded-md text-sm transition-all duration-300
              focus:outline-none
              font-roboto
              ${
                isDark
                  ? `bg-white/5 border border-white/10 text-white placeholder-gray-500
                     focus:border-royalStart focus:ring-2 focus:ring-royalStart/20 backdrop-blur-sm`
                  : `bg-white border border-[#E9EDF4] text-[#202C4B] placeholder-[#515B73]
                     focus:border-[#3D5EE1]`
              }
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
              ${className}
            `}
            {...props}
          />
          {icon && (
            <div
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-[#515B73]"
              }`}
            >
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
