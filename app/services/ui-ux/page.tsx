'use client';

import { motion } from 'framer-motion';
import { Layout, Palette, Zap } from 'lucide-react';

export default function UIUXPage() {
    return (
        <main className="relative pt-40 pb-24 bg-background px-6 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="container mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col mb-24"
                >
                    <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-8 block">CAPABILITY REF.001</span>
                    <h1 className="text-7xl lg:text-[140px] font-black tracking-tighter text-foreground leading-[0.85] mb-12">
                        Visceral <br/>
                        <span className="italic text-primary">Dynamics.</span>
                    </h1>
                    <p className="text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        We engineer digital environments designed to trigger immediate engagement. This is where psychology meets pixel-perfect execution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {[
                        { title: 'Neural Architecture', icon: Layout, desc: 'Information hierarchy designed for the way the human brain actually processes data.' },
                        { title: 'Aesthetic Authority', icon: Palette, desc: 'Visual languages that establish instant credibility and emotional resonance.' },
                        { title: 'High-Velocity Interaction', icon: Zap, desc: 'Micro-interactions engineered to provide dopamine loops and reduce friction.' }
                    ].map((item, i) => (
                        <motion.div 
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground tracking-tight">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
