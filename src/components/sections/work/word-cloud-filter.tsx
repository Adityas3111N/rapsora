'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function WordCloudFilter({
    categories,
    total,
    activeCategory,
    onSelect
}: {
    categories: Record<string, number>;
    total: number;
    activeCategory: string;
    onSelect: (cat: string) => void;
}) {
    const keys = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);

    // Randomize sizes for a realistic word cloud feel (or use counts)
    // To match the screenshot exactly, we just map out varying sizes.
    // The "explore all" is typically the largest.
    return (
        <section className="px-4 sm:px-6 lg:px-12 mx-auto max-w-6xl pt-4 lg:pt-10 pb-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex flex-wrap items-end justify-center gap-x-6 gap-y-2 lg:gap-x-10 lg:gap-y-4 text-center leading-none"
            >
                <button
                    onClick={() => onSelect('all')}
                    className={`font-heading tracking-tight hover:text-foreground transition-colors inline-flex ${
                        activeCategory === 'all' 
                            ? 'text-foreground font-bold' 
                            : 'text-foreground/30 hover:text-foreground/70'
                    }`}
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                    explore all<sub className="text-[14px] lg:text-[18px] mb-2 lg:mb-4 ml-1 opacity-50">{total}</sub>
                </button>

                {keys.map((cat, i) => {
                    // Create varying visual weights for word cloud
                    const count = categories[cat];
                    const maxCount = categories[keys[0]];
                    const ratio = count / maxCount;
                    // base size 2rem to max 3.5rem depending on ratio
                    const size = `clamp(1.5rem, ${2 + ratio * 1.5}vw, ${2.5 + ratio * 1}rem)`;
                    
                    return (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat)}
                            className={`font-heading tracking-tight hover:text-foreground transition-colors inline-flex items-baseline ${
                                activeCategory === cat 
                                    ? 'text-foreground font-bold' 
                                    : 'text-foreground/30 hover:text-foreground/70'
                            }`}
                            style={{ fontSize: size }}
                        >
                            {cat}<sub className="text-[12px] lg:text-[14px] ml-1 mb-1 lg:mb-2 opacity-50">{count}</sub>
                        </button>
                    );
                })}
            </motion.div>
        </section>
    );
}
