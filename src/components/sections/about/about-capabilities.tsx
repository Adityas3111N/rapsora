'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const CAPABILITIES = [
    {
        title: 'the hook + 3s',
        image: '/hook_strategy_abstract_visual_1774511721551.png',
        label: 'PERCEPTION CAPTURE',
        metric: '+89% ATTENTION',
        detail: 'Dominate the first 3 seconds of awareness.'
    },
    {
        title: 'glow + architecture',
        image: '/neuro_visual_abstract_visual_1774511743105.png',
        label: 'NEURO-DESIGN',
        metric: '94.2% PRECISION',
        detail: 'Systems built on biological visual priority.'
    },
    {
        title: 'precision + loops',
        image: '/growth_engine_abstract_visual_1774511764287.png',
        label: 'BEHAVIORAL GROWTH',
        metric: '2.4ms LATENCY',
        detail: 'High-velocity infrastructure for obsession.'
    }
];

export function AboutCapabilities() {
    const [paused, setPaused] = useState(false);

    return (
        <section className="relative w-full py-24 lg:py-40 bg-background overflow-hidden border-t border-black/5 dark:border-white/5">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    
                    {/* Left Column: Contextual Heading */}
                    <div className="lg:col-span-4 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <div className="h-px w-8 bg-foreground/20" />
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-foreground/40">
                                CAPABILITIES
                            </span>
                        </motion.div>
                        
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl lg:text-7xl font-serif text-foreground leading-[1.05] tracking-tighter mb-12"
                        >
                            Psychology <br/>
                            is <span className="italic text-primary">precision.</span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-xl text-muted-foreground leading-relaxed max-w-sm"
                        >
                            We engineer the invisible architecture that dictates user behavior. <br/> <br />
                            <span className="text-foreground italic font-medium">World-class performance requires absolute psychological accuracy.</span>
                        </motion.p>
                    </div>

                    {/* Right Column: Card Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {CAPABILITIES.map((cap, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        duration: 1.2, 
                                        delay: i * 0.2,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="flex flex-col group cursor-pointer"
                                    animate={paused ? { y: 0 } : { 
                                        y: [0, -15, 0], 
                                        transition: { duration: 8, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" } 
                                    }}
                                >
                                    {/* Medical/Science Study Image Card */}
                                    <div className="relative aspect-[3/4.5] mb-8 overflow-hidden rounded-[2px] transition-all duration-1000 bg-white dark:bg-[#111] shadow-[0_80px_120px_rgba(0,0,0,0.03)] dark:shadow-none border border-black/5 dark:border-white/10 group-hover:shadow-[0_100px_160px_rgba(144,97,249,0.1)]">
                                        <motion.img 
                                            src={cap.image}
                                            alt={cap.title}
                                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                        />
                                        
                                        {/* Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                            {/* Top Metadata */}
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black bg-white/90 backdrop-blur-md px-2 py-1 inline-block">
                                                        REF.{i + 1}
                                                    </span>
                                                    <span className="text-[10px] font-bold tracking-widest text-white/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {cap.label}
                                                    </span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:border-white transition-colors">
                                                    <div className="w-1 h-1 bg-white rounded-full" />
                                                </div>
                                            </div>

                                            {/* Center Metric Label (Reveal on Hover) */}
                                            <motion.div 
                                                className="self-center bg-[#9061F9] text-white px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 shadow-xl"
                                            >
                                                {cap.metric}
                                            </motion.div>

                                            {/* Bottom Detail */}
                                            <div className="overflow-hidden">
                                                <p className="text-[10px] font-bold tracking-widest text-white/80 leading-relaxed translate-y-full group-hover:translate-y-0 transition-transform duration-700 uppercase">
                                                    {cap.detail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Text Content */}
                                    <div className="flex flex-col items-center">
                                        <h4 className="text-2xl font-serif text-center mb-4 text-foreground/95 italic leading-tight group-hover:text-primary transition-colors">
                                            {cap.title}
                                        </h4>
                                        <div className="h-px w-0 bg-primary group-hover:w-full transition-all duration-700" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vertical Sidebar Text Label (Aesthetic) */}
                <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden lg:block pointer-events-none">
                    <span className="text-[10px] font-black tracking-[1em] text-foreground/5 uppercase whitespace-nowrap">
                        RAPSORA DIAGNOSTIC PROTOCOL V.2
                    </span>
                </div>

                {/* Floating Pause Control */}
                <div className="absolute bottom-10 right-10 z-20">
                    <button 
                        onClick={() => setPaused(!paused)}
                        className="flex items-center gap-6 bg-white dark:bg-card border border-black/5 dark:border-white/10 text-foreground px-8 py-4 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all shadow-xl group"
                    >
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                            {paused ? 'RESUME LOOPS' : 'PAUSE LOOPS'}
                        </span>
                        {paused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3 fill-current" />}
                    </button>
                </div>
            </div>
        </section>
    );
}
