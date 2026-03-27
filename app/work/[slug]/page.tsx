'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = PROJECTS.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Back Button */}
                <Link 
                    href="/work" 
                    className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Work
                </Link>

                {/* Hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-6"
                        >
                            <TrendingUp className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Case Study</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-8"
                        >
                            {project.title}
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl lg:text-2xl text-muted-foreground font-medium mb-12 leading-relaxed"
                        >
                            {project.subtitle}
                        </motion.p>

                        <div className="grid grid-cols-2 gap-12 pt-12 border-t border-border/50">
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-4">Metric</p>
                                <p className="text-4xl font-black tracking-tight" style={{ color: project.color }}>
                                    {project.metric}
                                </p>
                                <p className="text-sm font-bold text-muted-foreground mt-1">{project.metricLabel}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-4">Category</p>
                                <p className="text-xl font-bold tracking-tight">{project.category}</p>
                            </div>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-3xl bg-muted"
                    >
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                </div>

                {/* Content section */}
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
                    <p className="text-lg text-muted-foreground mb-16 leading-relaxed">
                        {project.description}
                    </p>

                    <h2 className="text-3xl font-bold mb-8">What We Did</h2>
                    <ul className="space-y-6 mb-24">
                        {[
                            "Psychological user flow engineering",
                            "High-fidelity visual identity system",
                            "Conversion-first development",
                            "Strategic SEO & Performance optimization"
                        ].map((item, i) => (
                            <motion.li 
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 text-lg font-medium"
                            >
                                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                {item}
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div className="p-12 rounded-[3rem] bg-foreground text-background flex flex-col items-start gap-8 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32" />
                        <h3 className="text-4xl font-black tracking-tight leading-none relative z-10">
                            Ready for your own<br />
                            <span className="text-primary italic">breakout success?</span>
                        </h3>
                        <Link
                            href="/contact"
                            className="group flex items-center gap-4 bg-primary text-white px-8 py-4 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-lg relative z-10"
                        >
                            Start Your Project
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:rotate-45 transition-transform">
                                <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
