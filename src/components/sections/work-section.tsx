'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   PROJECTS DATA
───────────────────────────────────────────────────────────── */
const PROJECTS = [
    {
        year: '2024',
        client: 'Aether Studio',
        title: "Crafting a bold identity for a luxury fashion house",
        tags: ['Branding', 'Website', 'SEO'],
        metric: '↑ 340% organic traffic',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop',
        href: '/work/aether-studio',
    },
    {
        year: '2024',
        client: 'Horizon Estates',
        title: "Designing an immersive property experience",
        tags: ['Shopify', 'Website'],
        metric: '↑ 2.8x conversion rate',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
        href: '/work/horizon-estates',
    },
    {
        year: '2024',
        client: 'Volt Studios',
        title: "A workspace consultancy creating inspiring environments",
        tags: ['Branding', 'UI/UX'],
        metric: '↑ 185% lead generation',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
        href: '/work/volt-studios',
    },
    {
        year: '2024',
        client: 'Nexus Global',
        title: "Redefining a leading global talent group",
        tags: ['Website', 'Development'],
        metric: '↑ 420% engagement',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop',
        href: '/work/nexus-global',
    },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED PROJECT CARD
───────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index % 2 === 1 ? 0.15 : 0 }}
        >
            <Link href={project.href} className="group block">
                {/* Image Container — top-right has no radius since notch sits there */}
                <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] rounded-tr-none aspect-[5/4] bg-muted shadow-2xl">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-50 transition-opacity duration-500 group-hover:opacity-70" />

                    {/* 🏷️ The NOTCH with Category Tags — compact pills */}
                    <div className="card-notch">
                        <div className="flex flex-wrap gap-2 justify-end">
                            {project.tags.map((tag, i) => (
                                <span
                                    key={tag}
                                    className={cn(
                                        "px-3.5 py-1.5 rounded-full bg-foreground/90 text-background font-bold text-[9px] lg:text-[10px] uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-300",
                                        i >= 2 && "hidden sm:inline-block"
                                    )}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Metric floating inside image */}
                    {project.metric && (
                        <div className="absolute bottom-5 left-5 z-20">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wide shadow-xl">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                {project.metric}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Text Area */}
                <div className="mt-8 lg:mt-10 px-2">
                    <div className="flex items-center gap-4 text-[13px] text-muted-foreground font-bold tracking-[0.1em] uppercase mb-4">
                        <span>{project.client}</span>
                        <div className="h-px w-8 bg-border transition-all duration-500 group-hover:w-12 group-hover:bg-primary" />
                        <span>{project.year}</span>
                    </div>

                    <h3 className="text-[1.75rem] lg:text-[2.25rem] font-heading font-black leading-[1.1] text-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                        {project.title}
                    </h3>

                    <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                        Explore Project
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN WORK SECTION
───────────────────────────────────────────────────────────── */
export function WorkSection() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

    return (
        <section className="relative w-full bg-background pt-12 pb-16 lg:pt-16 lg:pb-24">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">

                {/* ── Staggered 2-Column Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* LEFT COLUMN: First project + third project + CTA */}
                    <div className="flex flex-col gap-16 lg:gap-24">
                        <ProjectCard project={PROJECTS[0]} index={0} />
                        <ProjectCard project={PROJECTS[2]} index={2} />

                        {/* "Like what you see?" CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="pt-4"
                        >
                            <h3 className="font-heading text-[2rem] lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight text-foreground mb-8">
                                Like what<br />you see?
                            </h3>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-full px-7 py-3.5 text-[15px] font-bold tracking-tight hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-lg"
                            >
                                Contact us
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                            </Link>
                            <div className="flex items-center gap-2 mt-6">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-[13px] font-bold text-foreground/60 ml-1">Google</span>
                                <span className="text-[13px] font-medium text-foreground/40">reviews</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Section header + second project + fourth project */}
                    <div className="flex flex-col gap-16 lg:gap-24 md:pt-24 lg:pt-40">
                        {/* Section Header */}
                        <motion.div
                            ref={headerRef}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-3 text-foreground/70 font-bold tracking-tight text-[15px] mb-6">
                                <span className="w-2 h-2 rounded-full bg-foreground" />
                                Our Work
                            </div>
                            <h2 className="font-heading text-[2.5rem] lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight text-foreground mb-4">
                                Take a look at<br />our projects
                            </h2>
                        </motion.div>

                        <ProjectCard project={PROJECTS[1]} index={1} />
                        <ProjectCard project={PROJECTS[3]} index={3} />
                    </div>

                </div>
            </div>
        </section>
    );
}
