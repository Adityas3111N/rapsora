'use client';

import { motion } from 'framer-motion';
import { MousePointer2, Layers, Cpu } from 'lucide-react';

export default function WebDesignPage() {
    return (
        <main className="relative pt-40 pb-24 bg-background px-6 overflow-hidden">
            <div className="container mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col mb-24"
                >
                    <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-8 block">CAPABILITY REF.004</span>
                    <h1 className="text-7xl lg:text-[140px] font-black tracking-tighter text-foreground leading-[0.85] mb-12">
                        Obsessive <br/>
                        <span className="italic text-primary">Architecture.</span>
                    </h1>
                    <p className="text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        We don't just design websites; we engineer behavioral destiny. Every pixel is a calculated trigger designed to lead users to the ultimate objective.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {[
                        { title: 'Behavioral UX', icon: MousePointer2, desc: 'User journeys mapped against deep psychological archetypes to minimize bounce and maximize intent.' },
                        { title: 'Structural Integrity', icon: Layers, desc: 'Clean, brutalist-editorial layouts that project authority and elite brand positioning.' },
                        { title: 'Core Vitals', icon: Cpu, desc: 'High-velocity infrastructure that ensures zero-friction experiences across all global nodes.' }
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
