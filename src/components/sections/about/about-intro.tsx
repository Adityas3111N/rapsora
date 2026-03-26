'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutIntro() {
    return (
        <section className="relative w-full pt-16 pb-32 lg:pt-24 lg:pb-48 bg-background overflow-hidden border-t border-foreground/[0.05]">
            <div className="container mx-auto px-6 lg:px-12 xl:px-20 2xl:px-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    
                    {/* Left Column: The Vision Statement */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-8"
                        >
                            <Sparkles className="w-3 h-3" />
                            ABOUT US
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl md:text-6xl lg:text-[72px] font-bold leading-[1] tracking-tight text-foreground"
                        >
                            Architects of <span className="text-foreground/40 italic">attention</span>. We engineer psychological triggers that convert.
                        </motion.h2>
                    </div>

                    {/* Right Column: Detailed Pitch */}
                    <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-semibold">
                                RapSora is a high-performance branding and design lab based in Manchester, specializing in <span className="text-foreground relative after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:bg-primary/40">Conversion Psychology</span>, <span className="text-foreground relative after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:bg-primary/40">Strategic Branding</span>, and <span className="text-foreground relative after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:bg-primary/40">Digital Growth</span>.
                            </p>
                            
                            <p className="text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-medium">
                                We've mastered the <span className="text-foreground">science of the 'First 3 Seconds'</span>—the critical window where a brand either becomes a core memory or noise. Our mission is to transform elite founders into market-dominating leaders through design that demands respect.
                            </p>

                            <p className="text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-medium">
                                From disruptive startups like <span className="text-foreground font-bold">Blackberry</span> and <span className="text-foreground font-bold">L'Occitane</span> to global institutions such as the <span className="text-foreground font-bold">NHS</span>, we've delivered growth for those who refuse to settle for average. Our weapon of choice? <span className="italic text-primary font-bold tracking-tight uppercase text-sm lg:text-base">Unfiltered Precision.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <button className="group flex items-center gap-4 text-foreground font-bold tracking-tight hover:text-primary transition-colors duration-300">
                                <span className="text-lg">Let's craft your edge</span>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none -prevents-none" />
            <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-primary/2 rounded-full blur-[150px] pointer-events-none -prevents-none" />
        </section>
    );
}
