import React from 'react';
import { cn } from './Card'; // Reuse cn from Card or move to utils

const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    ...props
}) => {

    const variants = {
        primary: "bg-[#13ec80] text-[#0d1b14] hover:bg-[#0da85b] font-bold shadow-[0_0_20px_rgba(19,236,128,0.3)] hover:shadow-[0_0_25px_rgba(19,236,128,0.5)] border-transparent",
        secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent",
        outline: "bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#13ec80] hover:text-[#13ec80]",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-[#1a2f24] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent",
        glass: "glass-button text-gray-800 dark:text-white",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
        icon: "p-2"
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#13ec80]/50 disabled:opacity-50 disabled:pointer-events-none active:scale-95 border",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-inherit border-t-transparent" />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
