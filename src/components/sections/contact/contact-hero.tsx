'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, Play } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactHero() {
    return (
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1920px] pt-12 lg:pt-24 pb-12 overflow-visible">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                
                {/* Left column - Heading */}
                <div className="w-full lg:w-2/3 flex flex-col items-start relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-[14px] font-medium tracking-tight">Contact</span>
                    </motion.div>

                    <div className="flex flex-wrap items-end gap-x-4 gap-y-2 lg:gap-x-12">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: EASE }}
                            className="text-[12vw] sm:text-[10vw] lg:text-[150px] font-heading font-medium tracking-tight leading-[0.9] text-foreground mix-blend-difference"
                        >
                            It&apos;s nice to 
                        </motion.h1>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 mt-4 sm:ml-4 lg:ml-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                            className="text-[12vw] sm:text-[10vw] lg:text-[150px] font-heading font-medium tracking-tight leading-[0.9] text-foreground mix-blend-difference"
                        >
                            meet ya
                        </motion.h1>
                        
                        {/* Scroll down indicator blob */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                            className="hidden sm:flex items-center justify-center w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-primary mb-4 shrink-0 transition-transform duration-500 hover:scale-110"
                        >
                            <motion.div 
                                animate={{ y: [0, 5, 0] }} 
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <ArrowDownRight className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground" strokeWidth={1.5} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Right column - Trust Video / Image Wrapper */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                    className="w-full sm:w-[80%] lg:w-1/3 max-w-[400px] shrink-0 relative lg:mt-[-5rem] z-20"
                >
                    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-foreground/5 shadow-2xl group cursor-pointer">
                        <img 
                            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=800&fit=crop" 
                            alt="Team member at the studio" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Subtle interactive play button overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg mt-auto mb-12"
                            >
                                <Play className="w-6 h-6 lg:w-8 lg:h-8 text-primary-foreground translate-x-0.5 fill-primary-foreground" />
                            </motion.div>
                        </div>

                        {/* Faux name badge for psychological connection */}
                        <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase">
                            Say Hello
                        </div>
                    </div>
                </motion.div>
                
            </div>
            
            <div className="w-full h-[1px] bg-foreground/10 mt-16 lg:mt-32" />
        </section>
    );
}
