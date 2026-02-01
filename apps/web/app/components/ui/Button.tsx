"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "auth";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", isLoading, className = "", ...props }, ref) => {
    const baseStyles =
      "relative font-medium transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden font-roboto";

    const variants = {
      primary:
        "px-6 py-3 rounded-xl bg-gradient-to-r from-royalStart to-royalEnd text-white hover:shadow-lg hover:shadow-royalStart/30 hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm",
      outline:
        "px-6 py-3 rounded-xl bg-transparent text-royalStart border-2 border-royalStart hover:bg-royalStart hover:text-white",
      auth: "w-full h-9 rounded-[5px] bg-[#506EE4] hover:bg-[#3D5EE1] text-white text-sm",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;