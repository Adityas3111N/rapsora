'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS DATA
───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
    {
        quote: "RapSora didn't just build us a website — they engineered a revenue machine. Our conversions tripled within 90 days of launch.",
        name: 'Sarah Chen',
        title: 'CEO, Aether Studio',
        avatar: 'SC',
    },
    {
        quote: "The attention to detail is insane. Every micro-interaction, every pixel, every word — it all works together to tell our story perfectly.",
        name: 'James Wright',
        title: 'Founder, Horizon Estates',
        avatar: 'JW',
    },
    {
        quote: "We've worked with agencies before. RapSora is the first one that truly understood our brand and made it come alive digitally.",
        name: 'Priya Sharma',
        title: 'CMO, Nexus Global',
        avatar: 'PS',
    },
];

/* ─────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────────────────────── */
function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
            className="relative bg-foreground/[0.03] dark:bg-white/[0.04] rounded-[2rem] p-8 lg:p-10 border border-foreground/[0.06] dark:border-white/[0.06] hover:border-primary/20 transition-colors duration-500 group"
        >
            {/* Quote Icon */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <Quote className="w-4 h-4 text-primary" />
            </div>

            {/* Quote Text */}
            <blockquote className="text-[1.1rem] lg:text-[1.25rem] font-medium leading-relaxed text-foreground/80 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary font-heading font-bold text-[14px]">
                    {testimonial.avatar}
                </div>
                <div>
                    <div className="text-[15px] font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-[13px] font-medium text-foreground/50">{testimonial.title}</div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN TESTIMONIALS SECTION
───────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

    return (
        <section className="relative w-full bg-background py-16 lg:py-24">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">

                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 lg:mb-16 max-w-2xl"
                >
                    <div className="flex items-center gap-3 text-foreground/70 font-bold tracking-tight text-[15px] mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        What they say
                    </div>
                    <h2 className="font-heading text-[2rem] lg:text-[3rem] font-bold leading-[1.1] tracking-tight text-foreground">
                        Don&apos;t take our word for it.
                    </h2>
                </motion.div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}
