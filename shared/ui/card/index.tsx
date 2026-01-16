import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  hover?: boolean;
};

export function Card({
  children,
  hover = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg border border-white/10 p-6 bg-gray-800/30 backdrop-blur-sm ${
        hover
          ? "hover:border-white/20 hover:bg-gray-800/50 transition-colors"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
