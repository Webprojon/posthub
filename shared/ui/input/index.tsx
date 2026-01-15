import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border rounded-md bg-transparent text-white/50 placeholder-white/50 outline-none
         ${error ? "border-red-500" : "border-white/50"} ${className || ""}`}
    />
  );
}
