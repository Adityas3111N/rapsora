'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/shared/magnetic';
import { GooeyCTA } from '@/components/shared/gooey-cta';

/* ─────────────────────────────────────────────────────────────
   INFINITE MARQUEE TYPOGRAPHY CTA
───────────────────────────────────────────────────────────── */
function MarqueeItem() {
    return (
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-10 pr-4 sm:pr-6 lg:pr-10 shrink-0">
            <h2 className="font-heading text-[12vw] sm:text-[10vw] lg:text-[14vw] font-medium tracking-tight leading-none text-foreground mix-blend-plus-darker dark:mix-blend-plus-lighter whitespace-nowrap pt-8 pb-4">
                Let&apos;s work together.
            </h2>
            <div className="flex items-center justify-center w-[10vw] h-[10vw] sm:w-[6vw] sm:h-[6vw] lg:w-[8vw] lg:h-[8vw] rounded-full bg-primary shrink-0 mt-2 sm:mt-4 lg:mt-6 transition-transform hover:scale-105 hover:-rotate-12 cursor-pointer shadow-[0_0_40px_rgba(144,97,249,0.4)]">
                <ArrowUpRight className="w-[5vw] h-[5vw] sm:w-[3vw] sm:h-[3vw] lg:w-[4vw] lg:h-[4vw] text-primary-foreground stroke-[1.5]" />
            </div>
        </div>
    );
}

export function CtaSection() {
    return (
        <section className="relative w-full bg-background pt-16 lg:pt-32 pb-16 lg:pb-32 overflow-hidden flex flex-col items-center justify-center z-10 transition-colors duration-500 rounded-t-[2.5rem] lg:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] -mt-16 lg:-mt-24 rounded-b-none">
            {/* The Infinite Marquee (Top - Scrolls Left) */}
            <div className="w-full flex overflow-hidden shrink-0 group">
                <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused] transition-all duration-300">
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                </div>
            </div>

            {/* The Infinite Marquee (Bottom - Scrolls Right) */}
            <div className="w-full flex overflow-hidden shrink-0 group -mt-[2vw]">
                <div 
                    className="flex items-center animate-marquee group-hover:[animation-play-state:paused] transition-all duration-300"
                    style={{ animationDirection: 'reverse' }}
                >
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                    <MarqueeItem />
                </div>
            </div>

            {/* The Psychological Offer (Bottom) */}
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24 mt-16 lg:mt-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-black dark:bg-[#0D0D14] text-white p-10 lg:p-16 rounded-[2rem] lg:rounded-[3rem] border border-white/5 relative overflow-hidden group">
                    {/* Abstract background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-1000" />
                    
                    <div className="relative z-10 w-full lg:w-3/5">
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.1]"
                        >
                            Find the leak in your funnel. <span className="text-primary italic font-medium">For free.</span>
                        </motion.h3>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-white/60 text-lg lg:text-xl font-medium leading-[1.6] max-w-xl"
                        >
                            Most agencies want a massive retainer before they prove their worth. We don&apos;t. 
                            Let our world-class engineering team do a comprehensive tear-down of your user journey. 
                            <strong className="text-white font-bold ml-1">We will locate your biggest drop-off point and fix it—entirely as a gift.</strong> No strings attached.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 shrink-0 w-full lg:w-auto flex justify-start lg:justify-end"
                    >
                        <Magnetic strength={0.4}>
                            <GooeyCTA 
                                href="/contact" 
                                text="Claim Free Audit" 
                                pillColorClass="bg-primary" 
                                textColorClass="text-primary-foreground"
                            />
                        </Magnetic>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
