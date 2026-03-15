import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
 const baseStyles = "px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95";

 const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-premium focus:ring-brand-500",
  secondary: "bg-surface-100 text-surface-800 hover:bg-surface-200 focus:ring-surface-500",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm",
  outline: "border-2 border-surface-200 bg-transparent text-surface-700 hover:bg-surface-50 hover:border-brand-200 focus:ring-brand-500",
  ghost: "bg-transparent text-surface-600 hover:bg-surface-100 hover:text-surface-900 focus:ring-surface-400"
 };

 return (
  <button
   type={type}
   onClick={onClick}
   className={`${baseStyles} ${variants[variant]} ${className}`}
   {...props}
  >
   {children}
  </button>
 );
};

export const Input = ({ label, type = 'text', id, error, className = '', icon: Icon, ...props }) => {
 return (
  <div className={`flex flex-col mb-4 ${className}`}>
   {label && <label htmlFor={id} className="mb-1.5 text-sm font-semibold text-surface-700 ml-1">{label}</label>}
   <div className="relative group">
    {Icon && (
     <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-brand-500 transition-colors">
      <Icon size={18} />
     </div>
    )}
    <input
     type={type}
     id={id}
     className={`w-full ${Icon ? 'pl-11' : 'px-4'} py-2.5 bg-white border rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 ${error ? 'border-red-400 bg-red-50/30' : 'border-surface-200 group-hover:border-surface-300'}`}
     {...props}
    />
   </div>
   {error && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{error}</p>}
  </div>
 );
};

export const Card = ({ children, className = '', hover = true }) => {
 return (
  <div className={`bg-white rounded-2xl border border-surface-200 p-6 shadow-premium transition-all duration-300 ${hover ? 'hover:shadow-premium-hover hover:-translate-y-1' : ''} ${className}`}>
   {children}
  </div>
 );
};
