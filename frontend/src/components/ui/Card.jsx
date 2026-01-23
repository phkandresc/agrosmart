import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Card = ({ className, children, glass = true, hover = true, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-2xl relative overflow-hidden transition-all duration-300",
                glass ? "glass-card" : "bg-card text-card-foreground border shadow-sm",
                hover && "hover:shadow-lg hover:-translate-y-1 hover:border-[#13ec80]/30",
                className
            )}
            {...props}
        >
            {/* Subtle top shine for glass effect */}
            {glass && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-20" />
            )}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default Card;
