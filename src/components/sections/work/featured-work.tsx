'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedWork({ work }: { work: any }) {
    if (!work) return null;

    return (
        <section className="relative w-full">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
                
                {/* Image Section */}
                <Link
                    href={`/work/${work.slug}`}
                    className="group relative w-full lg:w-[65%] shrink-0 block overflow-hidden rounded-[2.5rem] bg-foreground/5 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01] duration-500 will-change-transform"
                >
                    <div className="aspect-[4/3] w-full relative">
                        <img 
                            src={work.image} 
                            alt={work.title} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                            sizes="(max-width: 1024px) 100vw, 65vw"
                        />
                    </div>
                </Link>

                {/* Details Section */}
                <div className="w-full lg:w-[32%] flex flex-col justify-between self-stretch pt-4 lg:pt-0 pb-12">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-3 lg:justify-end mb-6">
                        {work.tags?.map((tag: string) => (
                            <span 
                                key={tag} 
                                className="px-4 py-[0.4rem] rounded-full bg-foreground/[0.04] text-[12px] font-bold uppercase tracking-widest text-foreground/50 transition-colors cursor-default hover:bg-foreground/[0.08]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Testimonial Quote */}
                    {work.testimonial?.quote ? (
                        <div className="my-auto lg:text-right flex flex-col items-start lg:items-end w-full lg:mt-32">
                            <span className="text-4xl text-foreground/20 leading-none block mb-4 font-heading">"</span>
                            <blockquote className="text-[20px] lg:text-[24px] xl:text-[28px] leading-[1.3] font-medium text-foreground tracking-tight mb-8 max-w-lg lg:ml-auto text-left lg:text-right">
                                {work.testimonial.quote}
                            </blockquote>
                            <div className="flex items-center gap-4 text-left lg:text-right w-full lg:justify-end">
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-bold text-foreground">
                                        {work.testimonial.author}
                                    </p>
                                    <p className="text-[12px] text-foreground/50">
                                        {work.testimonial.role}{work.testimonial.company ? `, ${work.testimonial.company}` : ''}
                                    </p>
                                </div>
                                <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-2xl shrink-0 group hover:scale-110 hover:rotate-12 transition-transform duration-300">
                                    <span className="text-primary-foreground font-bold text-xl">{work.testimonial.author.charAt(0)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="my-auto flex flex-col justify-center grow">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/30 mb-4">{work.client} — {work.year}</p>
                            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                                {work.title}
                            </h2>
                            <Link href={`/work/${work.slug}`} className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 w-fit">
                                View Case Study <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Info text if testimonial is present (like in mock) */}
            {work.testimonial?.quote && (
                <div className="mt-6 flex flex-col lg:flex-row items-baseline gap-2 lg:gap-8">
                    <p className="text-sm font-bold tracking-tight text-foreground/80">{work.year} • {work.client}</p>
                    <h2 className="text-2xl lg:text-4xl font-heading font-medium tracking-tight text-foreground transition-all duration-300">
                        {work.title}
                    </h2>
                </div>
            )}
        </section>
    );
}
