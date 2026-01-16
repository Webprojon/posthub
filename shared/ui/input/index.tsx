import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-white/20 hover:border-white/30"
      } disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
    />
  );
}
