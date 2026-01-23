import React from 'react';
import { cn } from './Card';

const Badge = ({ children, variant = 'default', className, pulse = false }) => {

    const variants = {
        default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
        success: "bg-[#13ec80]/10 text-[#0da85b] dark:text-[#13ec80] border-[#13ec80]/20",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        danger: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    };

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
            variants[variant],
            className
        )}>
            {pulse && (
                <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
            )}
            {children}
        </span>
    );
};

export default Badge;
