import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-0 flex items-center justify-center",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
