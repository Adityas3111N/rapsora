'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const CATEGORIES = [
    { label: "explore all", weight: "font-medium", size: "text-6xl md:text-7xl lg:text-[90px]", defaultColor: "text-foreground", activeColor: "text-foreground", suffix: "445" },
    { label: "web development", weight: "font-normal", size: "text-5xl md:text-6xl lg:text-[75px]", defaultColor: "text-foreground/40", activeColor: "text-foreground", suffix: "118" },
    { label: "web design", weight: "font-medium", size: "text-6xl md:text-7xl lg:text-[85px]", defaultColor: "text-foreground/40", activeColor: "text-foreground", suffix: "131" },
    { label: "branding", weight: "font-normal", size: "text-5xl md:text-6xl lg:text-[75px]", defaultColor: "text-foreground/40", activeColor: "text-foreground", suffix: "40" },
    { label: "news & culture", weight: "font-medium", size: "text-[40px] md:text-5xl lg:text-[65px]", defaultColor: "text-foreground/40", activeColor: "text-foreground", suffix: "147" },
    { label: "archive", weight: "font-normal", size: "text-[50px] md:text-6xl lg:text-[80px]", defaultColor: "text-foreground/40", activeColor: "text-foreground", suffix: "78" },
];

export function BlogHero() {
    const [activeCategory, setActiveCategory] = useState("explore all");

    return (
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1920px] pt-32 lg:pt-48 pb-16 lg:pb-32">
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-8 lg:mb-12">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="text-sm font-medium tracking-tight uppercase">The Blog</span>
                </div>

                <div className="w-full flex flex-wrap items-baseline gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 lg:gap-y-4 font-heading tracking-tight leading-[0.9]">
                    {CATEGORIES.map((cat, idx) => {
                        const isActive = activeCategory === cat.label;
                        return (
                            <motion.button
                                key={cat.label}
                                onClick={() => setActiveCategory(cat.label)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                                className={cn(
                                    "relative flex items-end group transition-colors duration-500",
                                    cat.size,
                                    cat.weight,
                                    isActive ? cat.activeColor : cat.defaultColor,
                                    !isActive && "hover:text-foreground/70"
                                )}
                            >
                                <span>{cat.label}</span>
                                <span className={cn(
                                    "absolute -translate-y-2 translate-x-2 text-[12px] md:text-[14px] font-sans font-medium mb-1 ml-1 transition-colors duration-500",
                                    "left-full bottom-0",
                                    isActive ? "text-primary" : "text-foreground/30 group-hover:text-foreground/60"
                                )}>
                                    {cat.suffix}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
