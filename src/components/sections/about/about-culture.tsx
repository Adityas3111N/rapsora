'use client';

import { motion } from 'framer-motion';
import { Quote, Plus } from 'lucide-react';
import { GooeyCTA } from '@/components/shared/gooey-cta';
import { Magnetic } from '@/components/shared/magnetic';

export function AboutCulture() {
    return (
        <section id="our-culture" className="relative w-full pt-0 pb-24 lg:pb-40 bg-background overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left: The Visual with Notch */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_100px_rgba(144,97,249,0.15)]">
                            <img 
                                src="/rapsora_culture_vibrant.png" 
                                alt="RapSora Culture"
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            />
                            
                            {/* The Notch (Bottom Right Cutout) */}
                            <div 
                                className="absolute bottom-[-1px] right-[-1px] w-32 h-32 lg:w-48 lg:h-48 bg-background"
                                style={{
                                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 40%, 40% 40%, 40% 0)',
                                    borderRadius: '32px 0 0 0'
                                }}
                            />
                            
                            {/* Eye Badge inside Notch area */}
                            <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="relative w-20 h-20 lg:w-28 lg:h-28 rounded-full border border-primary/20 flex items-center justify-center bg-background/80 backdrop-blur-md"
                                >
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(144,97,249,0.5)]" />
                                        <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(144,97,249,0.5)]" />
                                    </div>
                                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20 fill-primary">
                                        <path id="badgePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                                        <text className="text-[10px] uppercase font-black tracking-widest">
                                            <textPath xlinkHref="#badgePath">RAPSORA LABS • ATTENTION •</textPath>
                                        </text>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: The Narrative */}
                    <div className="flex flex-col items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-foreground/40">
                                THE NEURAL ENVIRONMENT
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-foreground mb-8"
                        >
                            Where science <br />
                            meets <span className="text-primary italic">serotonin.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-lg"
                        >
                            We've engineered a high-vibrancy workspace where peak performance is the baseline. We produce addictive work for global brands, driven by an obsessive lab culture that celebrates both clinical precision and human expression.
                        </motion.p>

                        {/* Vision/Quote Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative w-full p-8 lg:p-12 rounded-[24px] bg-primary/5 dark:bg-primary/[0.03] border border-primary/10 mb-12 flex flex-col gap-6"
                        >
                            <Quote className="w-8 h-8 text-primary opacity-40" />
                            <p className="text-xl lg:text-2xl font-medium text-foreground leading-snug tracking-tight">
                                My vision has always been to engineer results that don't just solve problems, but dictate behavior. That's the Rapsora DNA.
                            </p>
                            
                            <div className="flex items-center gap-4 mt-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden grayscale bg-primary/20">
                                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Founder" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">Aashish</span>
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">Co-Founder</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Gooey CTA */}
                        <div className="flex gap-4">
                            <GooeyCTA 
                                text="Explore our Culture"
                                href="/diagnostic"
                                pillColorClass="bg-black dark:bg-white"
                                textColorClass="text-white dark:text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
