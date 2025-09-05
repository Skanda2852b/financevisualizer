import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium transition-colors";
  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700",
    destructive:
      "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
