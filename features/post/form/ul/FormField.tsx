import { RiAlertLine } from "react-icons/ri";
import type { FieldError } from "react-hook-form";
import React from "react";

type FormFieldProps = {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
          <RiAlertLine className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
}
