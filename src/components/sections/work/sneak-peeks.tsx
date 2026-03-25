'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GooeyCTA } from '@/components/shared/gooey-cta';

const EASE = [0.22, 1, 0.36, 1] as const;

export function SneakPeeks() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Parallax transforms targeting distinct scrolling speeds for depth
    const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-100, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const y4 = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Opacity fade-in linked to viewport
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 0.9, scale: 1, transition: { duration: 1.2, ease: EASE } },
    };

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden px-4 md:px-12 py-32 lg:py-64 bg-background text-foreground flex flex-col items-center">
            
            <motion.div 
                className="text-center w-full z-10 max-w-4xl mx-auto space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: EASE }}
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight relative z-20 mix-blend-difference">
                    Sexy stuff we&apos;re<br/>working on right now
                </h2>
                <p className="text-[15px] xl:text-[18px] text-foreground/50 tracking-wide font-medium relative z-20">
                    Shhhh... sneak previews, don&apos;t tell anyone
                </p>
                <div className="pt-8 relative z-20">
                    <GooeyCTA className="scale-110" />
                </div>
            </motion.div>

            {/* Scattered Mockup Images */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
                
                {/* Top Left */}
                <motion.div style={{ y: y1 }} className="absolute -left-12 top-[5%] pointer-events-auto">
                    <motion.div 
                        variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        // Continuous floating animation
                        animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=600&fit=crop"
                            className="w-[30vw] min-w-[280px] max-w-[500px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] saturate-0 hover:saturate-100 transition-all duration-700 rotate-[-12deg] hover:rotate-[-6deg]"
                            alt="Preview 1"
                        />
                    </motion.div>
                </motion.div>

                {/* Top Right */}
                <motion.div style={{ y: y2 }} className="absolute -right-4 top-[8%] pointer-events-auto">
                    <motion.div 
                        variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                            className="w-[28vw] min-w-[250px] max-w-[450px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] saturate-0 hover:saturate-100 transition-all duration-700 rotate-[8deg] hover:rotate-[4deg]"
                            alt="Preview 2"
                        />
                    </motion.div>
                </motion.div>

                {/* Bottom Left */}
                <motion.div style={{ y: y3 }} className="absolute left-[10%] bottom-[10%] pointer-events-auto">
                    <motion.div 
                        variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.5 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&h=800&fit=crop"
                            className="w-[22vw] min-w-[200px] max-w-[400px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] saturate-0 hover:saturate-100 transition-all duration-700 rotate-[-8deg] hover:rotate-[-4deg]"
                            alt="Preview 3"
                        />
                    </motion.div>
                </motion.div>

                {/* Bottom Right */}
                <motion.div style={{ y: y4 }} className="absolute right-[15%] -bottom-[5%] pointer-events-auto">
                    <motion.div 
                        variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 2 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                            className="w-[26vw] min-w-[260px] max-w-[480px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] saturate-0 hover:saturate-100 transition-all duration-700 rotate-[14deg] hover:rotate-[7deg]"
                            alt="Preview 4"
                        />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
