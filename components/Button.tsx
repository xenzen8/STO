import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-oswald font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 uppercase text-sm md:text-base";
  
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 border border-transparent shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_rgba(234,88,12,0.6)]",
    outline: "bg-transparent border border-gray-500 text-gray-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_10px_rgba(234,88,12,0.2)]",
    ghost: "bg-transparent text-gray-400 hover:text-orange-500 hover:bg-white/5"
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