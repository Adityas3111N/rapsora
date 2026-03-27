'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Magnetic } from '@/components/shared/magnetic';
import { GooeyCTA } from '@/components/shared/gooey-cta';
import { cn } from '@/lib/utils';
import { BLOG_POSTS } from '@/data/blogs';
import Link from 'next/link';


export function BlogSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // Smooth entrance animation
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = window.innerWidth > 1024 ? 600 : window.innerWidth > 640 ? 500 : 320;
        const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
        
        scrollContainerRef.current.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });
    };

    return (
        <section 
            ref={sectionRef}
            className="relative w-full bg-background pt-12 pb-20 lg:pt-16 lg:pb-32 overflow-hidden z-20"
        >
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col xl:flex-row gap-16 lg:gap-24 relative">
                
                {/* ── Left Sticky Column ── */}
                <div className="w-full xl:w-1/3 shrink-0 flex flex-col items-start xl:sticky xl:top-32 xl:h-fit z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-2 mb-6 sm:mb-8"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-[14px] sm:text-[15px] font-medium text-foreground tracking-tight">Insights</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading text-4xl sm:text-5xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-foreground mb-10 w-full max-w-md"
                    >
                        The latest from our engineering lab.
                    </motion.h2>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Magnetic strength={0.3}>
                            <GooeyCTA 
                                href="/blog" 
                                text="View all insights" 
                                pillColorClass="bg-primary" 
                                textColorClass="text-primary-foreground"
                            />
                        </Magnetic>
                    </motion.div>
                    
                    {/* Native slider controls */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden xl:flex items-center gap-4 mt-24"
                    >
                        <Magnetic strength={0.2}>
                            <button 
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full border border-foreground/10 hover:border-foreground/30 flex items-center justify-center transition-colors hover:scale-105 active:scale-95 cursor-pointer"
                                aria-label="Scroll left"
                            >
                                <ArrowLeft className="w-5 h-5 text-foreground/50" />
                            </button>
                        </Magnetic>
                        <Magnetic strength={0.2}>
                            <button 
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors hover:scale-105 active:scale-95 cursor-pointer"
                                aria-label="Scroll right"
                            >
                                <ArrowRight className="w-5 h-5 text-foreground" />
                            </button>
                        </Magnetic>
                    </motion.div>
                </div>

                {/* ── Right Carousel Column ── */}
                <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="w-full xl:w-2/3"
                >
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 lg:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {BLOG_POSTS.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                        {/* Fake padding block for spacing at the end */}
                        <div className="w-[1px] shrink-0" />
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}

import { extractInitials } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   BLOG CARD COMPONENT (With Architectural Cutout)
───────────────────────────────────────────────────────────── */
function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
    const initials = extractInitials(post.authorName || 'Rapsora Editor');

    return (
        <Link 
            href={`/blog/${post.slug}`} 
            className="w-[85vw] sm:w-[450px] lg:w-[500px] shrink-0 snap-center sm:snap-start group relative flex flex-col gap-6 lg:gap-8 focus:outline-none" 
            data-cursor-hover
        >
            
            {/* Image Container with Structural Mask */}
            <div className="relative w-full aspect-[4/3] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-foreground/5 isolation-auto shadow-sm">
                <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.22,1,0.36,1]" 
                />
                
                <div className="absolute bottom-0 left-0 w-20 h-20 lg:w-28 lg:h-28 bg-background rounded-tr-[1.5rem] lg:rounded-tr-[2.5rem] z-10 flex items-end justify-start pb-0 pl-0">
                    
                    {/* Author Avatar Nested Inside */}
                    <div className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-[1.2rem] lg:rounded-[1.8rem] overflow-hidden bg-primary/10 flex items-center justify-center border-4 border-background shadow-inner">
                        {post.authorImage ? (
                             <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover" />
                        ) : (
                             <span className="text-primary font-bold">{initials}</span>
                        )}
                    </div>

                    {/* SVG INVERSE CORNER: Top Left Mask connecting up the image wall */}
                    <svg viewBox="0 0 52 52" fill="currentColor" className="absolute bottom-full left-0 w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] text-background -rotate-90">
                        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                    </svg>

                    {/* SVG INVERSE CORNER: Bottom Right Mask connecting across the image floor */}
                    <svg viewBox="0 0 52 52" fill="currentColor" className="absolute bottom-0 left-full w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] text-background -rotate-90">
                        <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                    </svg>
                </div>
            </div>

            {/* Typography & Read Info */}
            <div className="flex flex-col gap-3 sm:gap-4 flex-grow px-2">
                <div className="flex items-center gap-2 text-foreground/50 text-[13px] sm:text-[14px] font-bold uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                    <span>{post.readTime}</span>
                </div>
                
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.2] group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h3>
                
                <p className="text-foreground/60 text-[15px] sm:text-[16px] font-medium leading-[1.6] line-clamp-3">
                    {post.excerpt}
                </p>
            </div>
        </Link>
    );
}
