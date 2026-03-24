'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GooeyCTAProps {
    href?: string;
    text?: string;
    className?: string;
    pillColorClass?: string;
    textColorClass?: string;
}

export function GooeyCTA({ 
    href = '/contact', 
    text = 'Start a project', 
    className,
    pillColorClass = "bg-primary",
    textColorClass = "text-primary-foreground"
}: GooeyCTAProps) {
    const [isHovered, setIsHovered] = useState(false);
    const filterId = useId();

    return (
        <Link 
            href={href}
            className={cn("relative flex items-center h-[56px] w-[240px] group cursor-pointer", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* SVG Filter Definition */}
            <svg width="0" height="0" className="absolute hidden">
                <filter id={filterId}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </svg>

            {/* Gooey Layer */}
            <div className="absolute -inset-6 p-6 flex items-center pointer-events-none z-0" style={{ filter: `url(#${filterId})` }}>
                <div className="relative w-full h-full flex items-center">
                    {/* Base Pill */}
                    <div className={cn("absolute left-0 right-[48px] h-full rounded-full", pillColorClass)} />
                    
                    {/* Ejecting Circle */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            right: isHovered ? 0 : 36 
                        }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        className={cn("absolute w-[56px] h-[56px] rounded-full", pillColorClass)}
                    />
                </div>
            </div>

            {/* Sharp Foreground Layer */}
            <div className="relative z-10 flex w-full h-full items-center">
                <span className={cn("pl-7 pr-12 text-[18px] font-bold leading-none tracking-tight w-full pointer-events-none selection:bg-transparent", textColorClass)}>
                    {text}
                </span>
                
                <motion.div 
                    initial={false}
                    animate={{ 
                        right: isHovered ? 0 : 36, 
                        rotate: isHovered ? 45 : 0 
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    className={cn("absolute z-10 w-[56px] h-[56px] flex items-center justify-center pointer-events-none", textColorClass)}
                >
                    <ArrowUpRight className="w-[22px] h-[22px] stroke-[2.5]" />
                </motion.div>
            </div>
        </Link>
    );
}
