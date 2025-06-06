import React from "react";

export const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantStyles = {
    default: "bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-500",
    outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-700 focus-visible:ring-gray-500",
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
