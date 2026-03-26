'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Globe, Heart } from 'lucide-react';
import { GooeyCTA } from '@/components/shared/gooey-cta';
import { Magnetic } from '@/components/shared/magnetic';

const IMAGES = [
    {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
        rotate: -5,
        y: 20,
        x: -20,
        label: 'STRATEGY'
    },
    {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        rotate: 3,
        y: -40,
        x: 0,
        label: 'DESIGN'
    },
    {
        url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
        rotate: -2,
        y: 10,
        x: 20,
        label: 'GROWTH'
    },
    {
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
        rotate: 4,
        y: 40,
        x: -10,
        label: 'FUTURE'
    }
];

export function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <section ref={containerRef} className="relative pt-32 pb-48 lg:pb-64 overflow-hidden bg-background">
            <div className="container px-4 mx-auto relative z-10">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-6"
                    >
                        <Sparkles className="w-3 h-3" />
                        THE RAPSORA STORY
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-foreground"
                    >
                        Good design <br />
                        <span className="text-foreground/30 italic">makes life better.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        We're a team of world-class hook psychologists, designers, and growth experts obsessed with turning your brand into a revenue machine.
                    </motion.p>
                </div>

                {/* Dynamic Image Grid */}
                <div className="relative max-w-6xl mx-auto mt-20">
                    <motion.div
                        style={{ y, rotate }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
                    >
                        {IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1.2,
                                    delay: i * 0.15,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] lg:rounded-[3rem] bg-foreground/[0.05] border border-foreground/[0.08] shadow-2xl dark:shadow-none"
                            >
                                <img
                                    src={img.url}
                                    alt={img.label}
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 lg:p-8">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">CAPABILITY</span>
                                    <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight">{img.label}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Gooey Badge/Button Overlay */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-20">
                        <Magnetic>
                            <div className="group relative">
                                <GooeyCTA
                                    text="Watch our story"
                                    href="#our-culture"
                                    className="scale-110 lg:scale-125"
                                />
                            </div>
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-[20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            {/* Spinning Text Mark */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 right-[-50px] lg:right-12 w-48 h-48 opacity-[0.08] dark:opacity-10 pointer-events-none select-none"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-foreground">
                    <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                    <text className="text-[10px] uppercase tracking-[0.3em] font-medium">
                        <textPath xlinkHref="#circlePath">
                            Rapsora Agency • Pure Creative Energy • Since 2024 •
                        </textPath>
                    </text>
                </svg>
            </motion.div>
        </section>
    );
}
