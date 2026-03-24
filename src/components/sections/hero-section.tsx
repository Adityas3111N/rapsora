'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { GooeyCTA } from '@/components/shared/gooey-cta';

const EASE = [0.22, 1, 0.36, 1] as const;

// Free 1080p stock video from Coverr CDN — "Team members come to the office" (startup people, no watermark)
const SHOWREEL_VIDEO = 'https://cdn.coverr.co/videos/coverr-team-members-come-to-the-office-5949/1080p.mp4';

/**
 * Inverse Rounded Corner SVG
 * Used to carve out the white block from the video background.
 */
const Corner = ({ className }: { className?: string }) => (
    <svg
        viewBox="52 52 52 52"
        fill="currentColor"
        className={className}
    >
        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
    </svg>
);

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // ── PARALLAX: Scroll Effects ──
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const videoOpacity = 1; // Removed fade to eliminate 'white tint' as requested

    // ── MAGNETIC: Mouse Affinity ──
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center (normalized -1 to 1)
        mouseX.set((e.clientX - centerX) / (rect.width / 2));
        mouseY.set((e.clientY - centerY) / (rect.height / 2));
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Magnetic transforms for the blocks
    const driftX = useTransform(springX, [-1, 1], [-15, 15]);
    const driftY = useTransform(springY, [-1, 1], [-10, 10]);
    const tiltR = useTransform(springX, [-1, 1], [-2, 2]);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full pt-24 lg:pt-24 pb-8 lg:pb-16 bg-background"
        >
            <div className="mx-auto px-2 sm:px-6 xl:px-12 2xl:px-20 3xl:px-40 4xl:px-60">

                {/* ── Outer Project Wrapper ── */}
                <motion.div
                    className="relative w-full overflow-hidden rounded-[4rem] aspect-[9/16] md:aspect-square lg:aspect-[16/9] bg-black shadow-2xl"
                >

                    {/* 🎞️ Layer 1: Background Video (With Parallax Scale) */}
                    <motion.div
                        style={{ scale: videoScale, opacity: videoOpacity }}
                        className="absolute inset-0 z-0 overflow-hidden"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="h-full w-full object-cover"
                        >
                            <source src={SHOWREEL_VIDEO} type="video/mp4" />
                        </video>
                    </motion.div>

                    {/* 🧩 Layer 2: The Stepped White Content Area (With Magnetic Drift) */}
                    <motion.div
                        style={{ y: contentY, x: driftX, translateY: driftY, rotate: tiltR, willChange: 'transform' }}
                        className="absolute top-8 lg:top-24 left-0 w-[88%] lg:w-[48vw] z-20 pointer-events-none"
                    >

                        <div className="flex flex-col items-start pointer-events-auto">
                            {/* BLOCK 1: Greeting — Concave on both top corners to "float" it */}
                            <div className="relative w-fit bg-white dark:bg-[#0A0A0B] py-4 lg:py-7 px-10 lg:px-14 rounded-r-[3.5rem] lg:rounded-r-[5rem]">
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    className="flex items-center gap-2 text-[12px] lg:text-[15px] font-bold text-primary tracking-tight"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Hiya, we&apos;re RapSora 👋
                                </motion.p>

                                {/* Top concave corners (masking the video above) */}
                                <Corner className="absolute left-0 -top-[31.9px] lg:-top-[51.9px] h-[32px] w-[32px] lg:h-[52px] lg:w-[52px] text-background rotate-180" />
                                <Corner className="absolute right-0 -top-[31.9px] lg:-top-[51.9px] h-[32px] w-[32px] lg:h-[52px] lg:w-[52px] text-background rotate-90" />

                                {/* Inner Elbow: Bridges Block 1 Bottom-Right to Block 2 Top edge */}
                                <Corner className="absolute left-full top-full -translate-y-[1px] h-[32px] w-[32px] lg:h-[52px] lg:w-[52px] text-background rotate-90" />
                            </div>

                            {/* MOBILE: Single Consolidated Block */}
                            <div className="lg:hidden relative w-fit bg-white dark:bg-[#0A0A0B] px-8 py-4 rounded-r-[3.5rem]">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
                                    className="font-heading text-[clamp(1.75rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground"
                                >
                                    A web design and branding agency that actually converts
                                </motion.h1>
                                <Corner className="absolute left-full top-full -translate-y-[1px] h-[32px] w-[32px] text-background rotate-90" />
                            </div>

                            {/* DESKTOP: Original Staircase (approved by user) */}
                            <div className="hidden lg:flex flex-col items-start">
                                {/* BLOCK 2: Headline Line 1 */}
                                <div className="relative w-fit bg-white dark:bg-[#0A0A0B] py-1.5 px-12 rounded-r-[5rem]">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05, duration: 0.8, ease: EASE }}
                                        className="font-heading text-[5.5rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground whitespace-nowrap"
                                    >
                                        A web design and
                                    </motion.h1>
                                    <Corner className="absolute left-full top-full -translate-y-[1px] h-[52px] w-[52px] text-background rotate-90" />
                                </div>

                                {/* BLOCK 3: Headline Line 2 */}
                                <div className="relative w-fit bg-white dark:bg-[#0A0A0B] pt-0 pb-0 px-12 rounded-r-[5rem]">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
                                        className="font-heading text-[5.5rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground whitespace-nowrap"
                                    >
                                        branding agency
                                    </motion.h1>
                                    <Corner className="absolute left-full top-full -translate-y-[1px] h-[52px] w-[52px] text-background rotate-90" />
                                </div>

                                {/* BLOCK 4: Headline Line 3 */}
                                <div className="relative w-fit bg-white dark:bg-[#0A0A0B] pt-0 pb-10 px-12 rounded-r-[5rem]">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
                                        className="font-heading text-[5.5rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground whitespace-nowrap"
                                    >
                                        that actually converts
                                    </motion.h1>
                                    <Corner className="absolute left-full top-full -translate-y-[1px] h-[52px] w-[52px] text-background rotate-90" />
                                </div>
                            </div>

                            {/* BLOCK 5: The CTAs (Steps In) */}
                            <div className="relative bg-white dark:bg-[#0A0A0B] px-8 lg:px-12 pt-12 lg:pt-16 pb-6 lg:pb-20 rounded-r-[3.5rem] lg:rounded-r-[5rem]">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
                                >
                                    <div className="scale-90 sm:scale-100 origin-left">
                                        <GooeyCTA 
                                            href="/work" 
                                            text="View our work" 
                                            pillColorClass="bg-foreground" 
                                            textColorClass="text-background"
                                        />
                                    </div>

                                    <Link
                                        href="/team"
                                        className="group hidden sm:flex items-center gap-2 text-[16px] font-bold text-foreground transition-colors hover:text-foreground/60"
                                    >
                                        Meet the team
                                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>

                                {/* Major curve transitioning from the white area back into the project video area */}
                                <Corner className="absolute right-0 -bottom-[31.9px] lg:-bottom-[51.9px] h-[32px] w-[32px] lg:h-[52px] lg:w-[52px] text-background rotate-270" />
                                {/* Bottom-left connection wall */}
                                <Corner className="absolute -left-[31.9px] lg:-left-[51.9px] bottom-0 h-[32px] w-[32px] lg:h-[52px] lg:w-[52px] text-background" />
                            </div>
                        </div>
                    </motion.div>

                    {/* 🏅 Sticky Andy Card (Bottom Right) */}
                    <div className="absolute top-0 right-0 flex h-full z-40 py-8 lg:py-12 px-6 lg:px-12 pointer-events-none">
                        <div className="sticky bottom-10 self-end pointer-events-auto">
                            <motion.a
                                href="#"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
                                className="group relative flex items-center rounded-full py-1.5 pl-1.5 pr-5 lg:pr-8 overflow-hidden shadow-3xl bg-white dark:bg-[#1C1D1F] transition-transform hover:scale-105 active:scale-95 translate-y-2 lg:translate-y-0"
                            >
                                <div className="relative w-12 h-12 lg:w-14 lg:h-14 mr-3 lg:mr-4 rounded-full bg-foreground/10 overflow-hidden flex items-center justify-center">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    >
                                        <source src="https://cdn.coverr.co/videos/coverr-team-members-come-to-the-office-5949/1080p.mp4" type="video/mp4" />
                                    </video>
                                    <Play className="absolute z-20 w-4 h-4 text-white fill-white transition-opacity group-hover:opacity-0" />
                                </div>
                                <div>
                                    <div className="text-[13px] lg:text-[14px] font-bold text-foreground">Hear from Andy</div>
                                    <div className="text-[10px] lg:text-[11px] font-bold text-foreground/40 uppercase tracking-widest">Co-Founder of RapSora</div>
                                </div>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
