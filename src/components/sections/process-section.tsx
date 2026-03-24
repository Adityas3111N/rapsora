'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Palette, Code2, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   PROCESS STEPS DATA
───────────────────────────────────────────────────────────── */
const STEPS = [
    {
        number: '01',
        title: 'Discover',
        description: "We dive deep into your brand, audience, and goals. Research-driven strategy ensures every pixel has purpose.",
        icon: Search,
    },
    {
        number: '02',
        title: 'Design',
        description: "Premium, conversion-focused interfaces crafted to command attention and build instant credibility.",
        icon: Palette,
    },
    {
        number: '03',
        title: 'Develop',
        description: "Clean, performant code that's buttery smooth. We build for speed, SEO, and scalability from day one.",
        icon: Code2,
    },
    {
        number: '04',
        title: 'Launch & Grow',
        description: "We don't disappear after launch. Ongoing optimization, analytics, and support to keep your growth compounding.",
        icon: Rocket,
    },
];

/* ─────────────────────────────────────────────────────────────
   STEP CARD (extracted for proper React lifecycle)
───────────────────────────────────────────────────────────── */
function StepCard({ step, index }: { step: { number: string; title: string; description: string; icon: LucideIcon }; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const Icon = step.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
            className="relative group p-8 lg:p-10 border-t border-white/10 lg:border-t-0 lg:border-l first:border-l-0 first:border-t-0"
        >
            {/* Step Number */}
            <div className="text-[13px] font-bold text-primary/80 tracking-widest uppercase mb-8">
                Step {step.number}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors duration-500">
                <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="font-heading text-[1.5rem] font-bold text-white mb-4 tracking-tight">
                {step.title}
            </h3>

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-white/50 font-medium">
                {step.description}
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PROCESS SECTION
───────────────────────────────────────────────────────────── */
export function ProcessSection() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

    return (
        <section className="relative w-full bg-foreground dark:bg-[#1A1B1E] text-background py-16 lg:py-24 overflow-hidden">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">

                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14 lg:mb-20 max-w-2xl"
                >
                    <div className="flex items-center gap-3 text-white/50 font-bold tracking-tight text-[15px] mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        How we work
                    </div>
                    <h2 className="font-heading text-[2rem] lg:text-[3rem] font-bold leading-[1.1] tracking-tight text-white">
                        A process built for<br />predictable results.
                    </h2>
                </motion.div>

                {/* Process Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                    {STEPS.map((step, i) => (
                        <StepCard key={step.number} step={step} index={i} />
                    ))}
                </div>

                {/* Urgency Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    className="mt-14 lg:mt-20 flex items-center gap-4"
                >
                    <div className="relative flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <span className="text-[15px] font-bold text-white/70">
                        Currently accepting <span className="text-primary">2 new projects</span> for Q2 2025
                    </span>
                </motion.div>

            </div>
        </section>
    );
}
