import React from "react";

function Button({
    children, 
    type = 'button',
    bgColor = 'bg-indigo-600 hover:bg-indigo-700',
    textColor = 'text-white',
    className = '',
    disabled = false,
    ...props
}) {
    return (
        <button 
            type={type} 
            disabled={disabled}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${bgColor} ${textColor} ${className}`} 
            {...props}
        > 
            {children} 
        </button>
    )
}

export default Button;