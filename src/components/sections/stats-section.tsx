'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNTER — counts up on scroll
───────────────────────────────────────────────────────────── */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 80, damping: 30, mass: 1 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplay(Math.round(latest));
        });
        return unsubscribe;
    }, [springValue]);

    return (
        <span ref={ref} className="tabular-nums">
            {display}{suffix}
        </span>
    );
}

/* ─────────────────────────────────────────────────────────────
   STATS DATA
───────────────────────────────────────────────────────────── */
const STATS = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 12, suffix: '+', label: 'Industries Served' },
    { value: 98, suffix: '%', label: 'Client Retention' },
    { value: 3, suffix: 'x', label: 'Avg. Revenue Growth' },
];

/* ─────────────────────────────────────────────────────────────
   MAIN STATS SECTION
───────────────────────────────────────────────────────────── */
export function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

    return (
        <section className="relative w-full bg-background py-8 lg:py-12">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-b border-foreground/10 py-12 lg:py-16"
                >
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                            className="text-center lg:text-left"
                        >
                            <div className="font-heading text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-none mb-3">
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-[14px] font-medium text-foreground/50 tracking-wide uppercase">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
