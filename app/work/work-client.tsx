'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordCloudFilter } from '@/components/sections/work/word-cloud-filter';
import { FeaturedWork } from '@/components/sections/work/featured-work';
import { WorkGrid } from '@/components/sections/work/work-grid';
import { LetWorkMarquee } from '@/components/sections/work/work-marquee';
import { SneakPeeks } from '@/components/sections/work/sneak-peeks';

export function WorkClient({ works, categories }: { works: any[], categories: Record<string, number> }) {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Filter works based on selection
    const filteredWorks = activeFilter === 'all' 
        ? works 
        : works.filter(w => w.categories?.includes(activeFilter));

    // Determine featured vs grid works
    const featuredWorks = filteredWorks.filter(w => w.isFeatured);
    const nonFeaturedWorks = filteredWorks.filter(w => !w.isFeatured);

    // If there's a featured item in the filtered list, use the first one, else undefined
    const topFeature = featuredWorks.length > 0 ? featuredWorks[0] : null;

    // Remaining items go into the grid
    let gridItems = [...nonFeaturedWorks];
    
    // If we have multiple featured items, add the rest to the grid too
    if (featuredWorks.length > 1) {
        gridItems = [...featuredWorks.slice(1), ...gridItems];
    }

    // In case there are NO featured works but we have works, maybe we should promote the first one?
    // Let's just follow strictly `isFeatured` for the large layout block, as the user wants predictable behavior.

    return (
        <div className="flex flex-col w-full relative">
            {/* Word Cloud Category Filter */}
            <WordCloudFilter 
                categories={categories} 
                total={works.length}
                activeCategory={activeFilter}
                onSelect={setActiveFilter}
            />

            {/* Featured Section */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1920px] pb-12 lg:pb-24 pt-8 lg:pt-16"
                >
                    {filteredWorks.length === 0 && (
                        <div className="text-center py-20 text-foreground/40 font-medium">
                            No projects found for this category.
                        </div>
                    )}

                    <div className="space-y-12 lg:space-y-24">
                        {/* 1. Featured Project */}
                        {topFeature && (
                            <FeaturedWork work={topFeature} />
                        )}

                        {/* 2. Masonry / Staggered Grid */}
                        {gridItems.length > 0 && (
                            <WorkGrid works={gridItems} />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* 3. Let's work together Marquee */}
            <LetWorkMarquee />

            {/* 4. Currently Working On / Sneak Peeks */}
            <SneakPeeks />
        </div>
    );
}
