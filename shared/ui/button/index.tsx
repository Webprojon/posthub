import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
    >
      {children}
    </button>
  );
}



