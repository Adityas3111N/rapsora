'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Magnetic } from '@/components/shared/magnetic';

export function LetWorkMarquee() {
    return (
        <section className="relative w-full overflow-hidden bg-primary py-16 lg:py-24 my-10 lg:my-20 flex flex-col items-center justify-center cursor-pointer group">
            <Link href="/diagnostic" className="w-full relative z-10 flex">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: 'loop',
                    }}
                    className="flex shrink-0 w-max whitespace-nowrap items-center"
                >
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center mx-8">
                            <span className="text-[60px] lg:text-[100px] xl:text-[140px] font-heading font-medium tracking-tight text-white leading-none group-hover:italic transition-all duration-300">
                                Let&apos;s work together.
                            </span>
                            <Magnetic>
                                <div className="w-16 h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 rounded-full border border-white/20 flex items-center justify-center ml-8 lg:ml-12 hover:bg-white hover:text-primary transition-colors duration-300">
                                    <ArrowUpRight className="w-8 h-8 lg:w-12 lg:h-12 text-white group-hover:text-primary transition-colors inherit" />
                                </div>
                            </Magnetic>
                        </div>
                    ))}
                </motion.div>
            </Link>
            
            {/* Subtle floating glow effect behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] mix-blend-overlay pointer-events-none" />
        </section>
    );
}
