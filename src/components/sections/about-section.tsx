'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Hexagon, Circle, Triangle, SquareMenu, Target, Layers } from 'lucide-react';
import { Magnetic } from '@/components/shared/magnetic';
import { GooeyCTA } from '@/components/shared/gooey-cta';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   REVEAL TEXT COMPONENT (Word-by-word animation)
───────────────────────────────────────────────────────────── */
const ANIMATION_DURATION = 0.6;
const STAGGER_DELAY = 0.035;

function RevealText({ text, className }: { text: string; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

    const words = text.split(" ");

    return (
        <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden inline-flex mr-[0.25em] pb-1">
                    <motion.span
                        initial={{ y: "110%", rotate: 2 }}
                        animate={isInView ? { y: 0, rotate: 0 } : { y: "110%", rotate: 2 }}
                        transition={{
                            duration: ANIMATION_DURATION,
                            ease: [0.22, 1, 0.36, 1], // Custom cubic bezier
                            delay: i * STAGGER_DELAY,
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

/* ─────────────────────────────────────────────────────────────
   INFINITE MARQUEE COMPONENT (SVG-Based)
───────────────────────────────────────────────────────────── */
// Generic high-end "Tech/Brand" SVG structures
const LOGOS = [
    { name: 'Vercel', icon: Triangle },
    { name: 'Figma', icon: Hexagon },
    { name: 'Stripe', icon: Layers },
    { name: 'Supabase', icon: Circle },
    { name: 'Linear', icon: Target },
    { name: 'Next.js', icon: SquareMenu },
];

function LogoMarquee() {
    return (
        <div className="relative w-full overflow-hidden shrink-0 mt-24 lg:mt-32 pb-10">
            {/* Gradient masks for edge fading */}
            <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center whitespace-nowrap w-max gap-16 lg:gap-32 pr-16 lg:pr-32 animate-marquee">
                {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                    <div 
                        key={i} 
                        className="flex items-center gap-3 text-foreground transition-all"
                    >
                        <logo.icon className="w-8 h-8 lg:w-10 lg:h-10 fill-current opacity-100" strokeWidth={1.5} />
                        <span className="font-heading font-extrabold tracking-tight text-xl lg:text-3xl uppercase opacity-100">{logo.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN ABOUT SECTION
───────────────────────────────────────────────────────────── */
export function AboutSection() {
    const ANIMATED_UNDERLINE = "relative inline-block after:absolute after:-bottom-[2px] after:left-0 after:w-full after:h-[1.5px] after:bg-current after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300 after:ease-out";

    return (
        <section className="relative w-full bg-background pt-8 pb-4 lg:pt-16 lg:pb-8 z-10">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
                    
                    {/* LEFT COLUMN: Anchor & Title */}
                    <div className="lg:col-span-4 flex items-start pt-2 lg:pt-3">
                        <div className="flex items-center gap-4 text-foreground/80 font-bold tracking-tight text-[15px] lg:text-[17px]">
                            {/* Blinking Dot Hook */}
                            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary mb-0.5 opacity-60"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary mb-0.5"></span>
                            </div>
                            Who are we?
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Tighter Copy & CTAs */}
                    <div className="lg:col-span-8">
                        <RevealText 
                            text="An elite digital agency engineering high-converting ecosystems. Established in 2024, we don't just build websites—we craft digital authority that systematically drives revenue." 
                            className="font-heading text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight text-foreground mb-12"
                        />
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                            {/* Magnetic Secondary CTA Pill */}
                            <Magnetic strength={0.4}>
                                <GooeyCTA 
                                    text="About RapSora" 
                                    pillColorClass="bg-primary"
                                    textColorClass="text-primary-foreground"
                                />
                            </Magnetic>
                            
                            {/* Animated Text Link */}
                            <Magnetic strength={0.2}>
                                <Link 
                                    href="/team" 
                                    className={cn("group flex items-center gap-2 text-[15px] lg:text-[16px] font-bold text-foreground transition-colors p-2 -ml-2", ANIMATED_UNDERLINE)}
                                >
                                    Meet the Team 
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                </div>

            </div>

            {/* INFINITE MARQUEE */}
            <LogoMarquee />
        </section>
    );
}
