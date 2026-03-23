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
}

export function GooeyCTA({ href = '/contact', text = 'Start a project', className }: GooeyCTAProps) {
    const [isHovered, setIsHovered] = useState(false);
    const filterId = useId();

    return (
        <Link 
            href={href}
            className={cn("relative flex items-center h-[56px] w-[240px] group cursor-pointer mb-2", className)}
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
                    <div className="absolute left-0 right-[48px] h-full bg-primary rounded-full" />
                    
                    {/* Ejecting Circle */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            right: isHovered ? 0 : 36 
                        }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        className="absolute w-[56px] h-[56px] bg-primary rounded-full"
                    />
                </div>
            </div>

            {/* Sharp Foreground Layer */}
            <div className="relative z-10 flex w-full h-full items-center">
                <span className="pl-7 pr-12 text-[18px] font-medium leading-none text-primary-foreground tracking-tight w-full pointer-events-none selection:bg-transparent">
                    {text}
                </span>
                
                <motion.div 
                    initial={false}
                    animate={{ 
                        right: isHovered ? 0 : 36, 
                        rotate: isHovered ? 45 : 0 
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    className="absolute z-10 w-[56px] h-[56px] flex items-center justify-center text-primary-foreground pointer-events-none"
                >
                    <ArrowUpRight className="w-[22px] h-[22px] stroke-[2.5]" />
                </motion.div>
            </div>
        </Link>
    );
}
