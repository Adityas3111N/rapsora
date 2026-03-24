'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, TrendingUp } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
            className="group relative flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] h-[550px] lg:h-[650px] overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] bg-foreground/[0.03] dark:bg-white/[0.03] border border-foreground/5 dark:border-white/5 snap-center shadow-2xl"
        >
            {/* 🎞️ Background Layer: Project Image with Parallax & Hover Shift */}
            <motion.div
                className="absolute inset-0 z-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: EASE }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 transition-colors duration-500" />
                <div
                    className="absolute inset-0 group-hover:opacity-80 transition-opacity duration-1000 grayscale-[20%] group-hover:grayscale-0"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            </motion.div>

            {/* 🏷️ The NOTCH with Category Tag (Matches the new brand style) */}
            <div className="card-notch scale-75 lg:scale-100 origin-top-right">
                <div className="flex flex-wrap gap-2 justify-end">
                    <span className="px-5 py-2 rounded-full bg-foreground text-background font-bold text-[10px] lg:text-[11px] uppercase tracking-wider">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* 🧩 Content Layer: The "Money-First" Hook */}
            <div className="relative z-20 h-full w-full flex flex-col justify-end p-8 lg:p-12 text-left">

                {/* Metric Badge: Floating Glassmorph */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="absolute top-8 lg:top-12 left-8 lg:left-12 flex flex-col items-start"
                >
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-5 lg:px-6 py-3 lg:py-4 flex flex-col items-start shadow-2xl">
                        <span className="text-2xl lg:text-3xl font-black italic tracking-tighter" style={{ color: project.color }}>
                            {project.metric}
                        </span>
                        <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-white/60 mt-1">
                            {project.metricLabel}
                        </span>
                    </div>
                </motion.div>

                {/* Info Area */}
                <div className="max-w-md">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-4xl lg:text-6xl font-black tracking-tight mb-4 text-white group-hover:text-primary transition-colors leading-[0.9]"
                    >
                        {project.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-base lg:text-lg text-white/60 mb-8 leading-relaxed line-clamp-2 lg:line-clamp-none font-medium"
                    >
                        {project.description}
                    </motion.p>

                    <Link
                        href={project.link}
                        className="group/btn relative inline-flex items-center gap-4 bg-primary text-white px-6 lg:px-8 py-3.5 lg:py-4 rounded-full font-black text-xs lg:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)]"
                    >
                        View Case Study
                        <div className="flex h-5 lg:h-6 w-5 lg:w-6 items-center justify-center rounded-full bg-white/20 group-hover/btn:rotate-45 transition-transform">
                            <ArrowUpRight className="h-4 lg:h-5 w-4 lg:w-5" strokeWidth={3} />
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function FeaturedWork() {
    return (
        <section className="relative w-full bg-background pt-10 pb-40 overflow-hidden transition-colors duration-500">
            <div className="max-w-[100vw]">
                {/* Header: The Authority Hook - Slightly offset for better flow from Hero */}
                <div className="mx-auto px-6 xl:px-12 2xl:px-20 3xl:px-40 4xl:px-60 flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-20">
                    <div className="max-w-2xl text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-5"
                        >
                            <TrendingUp className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-primary">Proven In The Trenches</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="text-4xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-foreground"
                        >
                            Engineered for <br />
                            <span className="text-foreground/20">Hyper-Growth.</span>
                        </motion.h1>
                    </div>
                </div>

                {/* Horizontal Swipeable Grid: Infinite feel */}
                <div className="relative">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-10 pb-8 px-6 xl:px-12 2xl:px-20 3xl:px-40 4xl:px-60 no-scrollbar items-center">
                        {PROJECTS.map((project, idx) => (
                            <ProjectCard key={project.id} project={project} index={idx} />
                        ))}

                        {/* Empty spacer to allow snapping the last card correctly */}
                        <div className="flex-shrink-0 w-6 lg:w-10 invisible h-full" />
                    </div>
                </div>

                {/* Final Hook - Integrated into the page flow */}
                <div className="mx-auto px-6 xl:px-12 2xl:px-20 3xl:px-40 4xl:px-60 mt-20 lg:mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="p-1 lg:p-2 bg-gradient-to-r from-primary/40 via-blue-500/40 to-primary/40 rounded-[3rem] lg:rounded-full overflow-hidden shadow-2xl"
                    >
                        <div className="bg-background rounded-[2.9rem] lg:rounded-full py-10 lg:py-16 px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10 transition-colors duration-500">
                            <div className="text-left">
                                <h3 className="text-2xl lg:text-4xl font-black tracking-tight mb-2 text-foreground">Ready for your ROI breakout?</h3>
                                <p className="text-muted-foreground text-base lg:text-lg font-medium italic">Our next world-class success story starts here.</p>
                            </div>
                            <Link
                                href="/diagnostic"
                                className="group flex items-center gap-6 bg-foreground text-background px-8 lg:px-10 py-4 lg:py-5 rounded-full font-black text-base lg:text-lg transition-all hover:scale-[1.03] active:scale-95 shadow-[0_30px_60px_rgba(var(--foreground-rgb),0.2)]"
                            >
                                Start Growth Diagnostic
                                <div className="flex h-8 lg:h-10 w-8 lg:w-10 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:rotate-45">
                                    <ArrowUpRight className="h-5 lg:h-6 w-5 lg:w-6" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -z-10" />
        </section>
    );
}
