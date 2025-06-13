// src/components/ui/ui.js

import React, { useState, createContext, useContext } from "react";

// === Card ===
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// === Button ===
export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// === Input ===
export const Input = ({ 
  type = 'text',
  className = '',
  error,
  ...props 
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

// === StatusSelect (HTML <select>) ===
export const StatusSelect = ({ value, onChange }) => (
  <select
    className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Tất cả</option>
    <option value="Chưa giao">Chưa giao</option>
    <option value="Đang giao">Đang giao</option>
    <option value="Đã giao">Đã giao</option>
  </select>
);

// Nếu muốn dropdown custom, bạn có thể implement thêm ở đây
// Ví dụ (giữ nguyên custom Select trước đó):
const CustomSelectContext = createContext({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
});

export const CustomSelect = ({ children, value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <CustomSelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </CustomSelectContext.Provider>
  );
};

export const CustomSelectTrigger = ({ children, className }) => {
  const { open, setOpen } = useContext(CustomSelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${className || ""}`}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
};

export const CustomSelectValue = ({ placeholder }) => {
  const { value } = useContext(CustomSelectContext);
  return <span className="block truncate">{value || placeholder}</span>;
};

export const CustomSelectContent = ({ children, className }) => {
  const { open, setOpen } = useContext(CustomSelectContext);
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className={`absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-700 shadow-md animate-in fade-in-80 ${className || ""}`}
        style={{ top: "100%", left: 0 }}
      >
        <div className="max-h-[200px] overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export const CustomSelectItem = ({ children, value, className }) => {
  const { value: selectedValue, onValueChange, setOpen } = useContext(CustomSelectContext);
  const isSelected = selectedValue === value;
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-md py-1.5 px-2 text-sm hover:bg-gray-100 ${
        isSelected ? "bg-gray-100 font-medium " : ""
      }${className || ""}`}
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
      <span className={isSelected ? "ml-5" : "ml-2"}>{children}</span>
    </div>
  );
};

// === Select Component ===
export const Select = ({ 
  children, 
  className = '',
  error,
  ...props 
}) => {
  return (
    <div className="w-full">
      <select
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
