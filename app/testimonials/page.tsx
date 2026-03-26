'use client';

import { motion } from 'framer-motion';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ArrowDown } from 'lucide-react';

export default function TestimonialsPage() {
    return (
        <main className="bg-background overflow-hidden">
            {/* Cinematic Hero */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
                <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                
                <div className="container mx-auto text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[10px] sm:text-[12px] font-black tracking-[0.5em] text-primary uppercase mb-8 block"
                    >
                        THE OBSESSION LOG
                    </motion.span>
                    
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl sm:text-8xl lg:text-[120px] font-black tracking-tighter text-foreground leading-[0.85] mb-12"
                    >
                        Validated <br/>
                        <span className="italic text-primary">Authority.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-16"
                    >
                        We don't just build websites; we engineer behavioral shifts. Read how we've pivoted the trajectories of world-class brands.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex justify-center"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
                    </motion.div>
                </div>
            </section>

            <div className="mt-[-100px]">
                <TestimonialsSection />
            </div>

            {/* Bottom Proof Marquee (Optional later addition) */}
        </main>
    );
}
