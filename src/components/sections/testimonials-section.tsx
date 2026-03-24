'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Magnetic } from '@/components/shared/magnetic';
import { GooeyCTA } from '@/components/shared/gooey-cta';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS DATA
───────────────────────────────────────────────────────────── */
const FEATURED_TESTIMONIAL = {
    quote: 'RapSora created something better than I ever could have imagined',
    name: 'Hannah Wessel',
    role: 'Co-Founder',
    company: 'Stoneletters',
    avatar: '/images/testimonials/avatar-hannah.png',
    background: '/images/testimonials/testimonial-bg.png',
};

const TESTIMONIALS = [
    {
        quote: 'They didn\'t just redesign our website — they completely transformed our conversion pipeline. Revenue jumped 340% in 90 days.',
        name: 'Sarah Chen',
        role: 'CEO',
        company: 'Luminary Studios',
        avatar: '/images/testimonials/avatar-sarah.png',
        stars: 5,
        metric: '340%',
        metricLabel: 'Revenue Growth',
    },
    {
        quote: 'Working with RapSora felt like having an in-house elite design team. Every pixel was intentional, every interaction magnetic.',
        name: 'James Okafor',
        role: 'Founder',
        company: 'Nexus Ventures',
        avatar: '/images/testimonials/avatar-james.png',
        stars: 5,
        metric: '12x',
        metricLabel: 'Lead Generation',
    },
    {
        quote: 'Our brand went from forgettable to iconic. The identity system they built has become the backbone of everything we do.',
        name: 'Maya Rodriguez',
        role: 'Creative Director',
        company: 'Forma Collective',
        avatar: '/images/testimonials/avatar-maya.png',
        stars: 5,
        metric: '98%',
        metricLabel: 'Client Satisfaction',
    },
];

/* ─────────────────────────────────────────────────────────────
   STAR RATING COMPONENT
───────────────────────────────────────────────────────────── */
function StarRating({ count, delay = 0 }: { count: number; delay?: number }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: delay + i * 0.06 }}
                >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                </motion.div>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED VIDEO TESTIMONIAL CARD
───────────────────────────────────────────────────────────── */
function FeaturedTestimonial() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative w-full overflow-hidden rounded-[2rem] lg:rounded-[3rem] aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7] group"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={FEATURED_TESTIMONIAL.background}
                    alt="Testimonial background"
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    priority
                />
                {/* Gradient overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* ── Floating Quote Card ── */}
            <motion.div
                initial={{ opacity: 0, x: -50, y: -20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -50, y: -20 }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                className="absolute top-6 left-6 sm:top-8 sm:left-8 lg:top-12 lg:left-12 z-20 max-w-[85%] sm:max-w-md lg:max-w-lg"
            >
                <div className="bg-white rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Quote marks */}
                    <div className="flex items-start gap-3 mb-3 sm:mb-4">
                        <div className="flex gap-0.5 shrink-0 mt-1">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-none">&ldquo;</span>
                        </div>
                    </div>

                    {/* Quote text */}
                    <h3 className="font-heading text-[1.1rem] sm:text-[1.5rem] lg:text-[2rem] xl:text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em] text-black">
                        {FEATURED_TESTIMONIAL.quote}
                    </h3>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-4 sm:mt-5 lg:mt-6">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-foreground/10">
                            <Image
                                src={FEATURED_TESTIMONIAL.avatar}
                                alt={FEATURED_TESTIMONIAL.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-[13px] sm:text-[14px] font-bold text-black leading-tight">
                                {FEATURED_TESTIMONIAL.name}
                            </p>
                            <p className="text-[11px] sm:text-[12px] font-medium text-black/50 leading-tight">
                                {FEATURED_TESTIMONIAL.role}, {FEATURED_TESTIMONIAL.company}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Play Button (Bottom Left) ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-12 z-20"
            >
                <Magnetic strength={0.4}>
                    <button className="group/play flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 hover:scale-110 active:scale-95">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground ml-0.5" />
                    </button>
                </Magnetic>
            </motion.div>

            {/* ── Bottom Right CTAs ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
                className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 z-20 flex items-center gap-3"
            >
                <Magnetic strength={0.3}>
                    <button className="group/btn flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-black text-[13px] sm:text-[14px] font-bold tracking-tight shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 active:scale-95">
                        Play video
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                            <Play className="w-3 h-3 text-primary-foreground fill-primary-foreground ml-[1px]" />
                        </div>
                    </button>
                </Magnetic>

                <Magnetic strength={0.3}>
                    <Link
                        href="/testimonials"
                        className="group/link flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white text-[13px] sm:text-[14px] font-bold tracking-tight hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                        View more testimonials
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:rotate-45" />
                    </Link>
                </Magnetic>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────────────────────── */
function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: EASE, delay: index * 0.15 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl lg:rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-700 min-h-[320px]"
        >
            {/* Ambient glow on hover */}
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Top: Metric badge + Stars */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    {isInView && <StarRating count={testimonial.stars} delay={0.3 + index * 0.15} />}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-[13px] font-bold text-primary">{testimonial.metric}</span>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{testimonial.metricLabel}</span>
                    </div>
                </div>

                {/* Quote */}
                <div className="relative">
                    <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/20 rotate-180" />
                    <p className="font-heading text-[1rem] sm:text-[1.1rem] lg:text-[1.2rem] font-medium leading-[1.5] text-white/80 pl-6">
                        {testimonial.quote}
                    </p>
                </div>
            </div>

            {/* Bottom: Author */}
            <div className="relative z-10 flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-primary/30 transition-all duration-500">
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="text-[14px] font-bold text-white leading-tight">{testimonial.name}</p>
                    <p className="text-[12px] font-medium text-white/40 leading-tight">
                        {testimonial.role}, {testimonial.company}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN TESTIMONIALS SECTION
───────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-black pt-8 pb-0 lg:pt-16 lg:pb-0 overflow-hidden"
        >
            {/* Ambient glow effects */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">

                {/* ── HEADER ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0 }}
                    animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-20"
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                            className="flex items-center gap-3 text-white/60 font-bold tracking-tight text-[14px] lg:text-[15px] mb-5 lg:mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Client Stories
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                            className="font-heading text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.05] tracking-[-0.03em] text-white"
                        >
                            Don&apos;t take our word
                            <br className="hidden sm:block" />
                            <span className="text-white/40"> — hear from theirs</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.4 }}
                        className="shrink-0"
                    >
                        <Magnetic strength={0.4}>
                            <GooeyCTA
                                href="/case-studies"
                                text="All case studies"
                                pillColorClass="bg-primary"
                                textColorClass="text-primary-foreground"
                            />
                        </Magnetic>
                    </motion.div>
                </motion.div>

                {/* ── FEATURED TESTIMONIAL ── */}
                <FeaturedTestimonial />

                {/* ── SUPPORTING CARDS GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* ── TRUST STRIP ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{ duration: 1, ease: EASE }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-12 lg:mt-20 pt-10 border-t border-white/[0.06]"
                >
                    {[
                        { value: '50+', label: 'Projects Delivered' },
                        { value: '4.9/5', label: 'Average Rating' },
                        { value: '97%', label: 'Client Retention' },
                        { value: '$2M+', label: 'Revenue Generated' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.1 * i }}
                            className="flex items-center gap-3 text-center sm:text-left"
                        >
                            <span className="font-heading text-2xl lg:text-3xl font-bold text-primary">{stat.value}</span>
                            <span className="text-[12px] lg:text-[13px] font-bold text-white/30 uppercase tracking-wider">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
