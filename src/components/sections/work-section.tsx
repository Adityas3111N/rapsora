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
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] aspect-[4/5] bg-muted">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Category Tags */}
                    <div className="absolute top-5 right-5 flex flex-wrap gap-2 justify-end">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-4 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-[12px] font-bold tracking-wide"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Meta */}
                <div className="mt-6 lg:mt-8">
                    <div className="flex items-center gap-3 text-[14px] text-foreground/50 font-medium mb-2">
                        <span>{project.year}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/40" />
                        <span>{project.client}</span>
                    </div>
                    <h3 className="text-[1.25rem] lg:text-[1.5rem] font-heading font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                    </h3>
                    {project.metric && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[12px] font-bold tracking-wide">
                            {project.metric}
                        </div>
                    )}
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
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/>
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
