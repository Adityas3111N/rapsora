'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/shared/magnetic';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────────────────────── */
const SERVICES = [
    {
        name: 'Brand Identity',
        description: 'Logo systems, visual language, and brand guidelines that position you as the category leader.',
        href: '/services/branding',
    },
    {
        name: 'Websites',
        description: 'High-converting, blazing-fast websites engineered for growth and built to scale.',
        href: '/services/websites',
    },
    {
        name: 'E-Commerce',
        description: 'Revenue-first Shopify & custom storefronts that turn browsers into loyal customers.',
        href: '/services/ecommerce',
    },
    {
        name: 'UI/UX Design',
        description: 'User-centric interfaces crafted with data-driven design and micro-interactions.',
        href: '/services/design',
    },
    {
        name: 'SEO & Growth',
        description: 'Organic traffic strategies and conversion optimization that compound over time.',
        href: '/services/seo',
    },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED SERVICE ROW
───────────────────────────────────────────────────────────── */
function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: EASE, delay: index * 0.15 }}
        >
            <Link href={service.href} className="group block">
                {/* Top separator line */}
                <div className="w-full h-px bg-white/[0.08] group-hover:bg-white/[0.15] transition-colors duration-700" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between py-8 lg:py-10 gap-4 lg:gap-8">
                    {/* Service Name */}
                    <motion.h3
                        className="font-heading text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold leading-[1] tracking-[-0.03em] text-white transition-all duration-700 group-hover:text-primary group-hover:translate-x-4"
                    >
                        {service.name}
                    </motion.h3>

                    {/* Right side: Description + Arrow */}
                    <div className="flex items-center gap-6 lg:gap-10 lg:max-w-md shrink-0">
                        <p className="text-white/40 text-sm lg:text-[15px] font-medium leading-relaxed hidden lg:block group-hover:text-white/60 transition-colors duration-700">
                            {service.description}
                        </p>
                        <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/[0.08] group-hover:border-primary group-hover:bg-primary/10 transition-all duration-700 shrink-0">
                            <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-white/30 group-hover:text-primary group-hover:rotate-45 transition-all duration-700" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPERTISE SECTION
───────────────────────────────────────────────────────────── */
export function ExpertiseSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-black pt-24 pb-16 lg:pt-40 lg:pb-32 overflow-hidden"
        >
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24">

                {/* ── HEADER: Three-Column Layout ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0 }}
                    animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1.8, ease: EASE }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 lg:mb-32"
                >
                    {/* Column 1: Label */}
                    <div className="lg:col-span-2 flex items-start pt-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                            className="flex items-center gap-3 text-white/60 font-bold tracking-tight text-[14px] lg:text-[15px]"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Our Expertise
                        </motion.div>
                    </div>

                    {/* Column 2: Large Italic Heading */}
                    <div className="lg:col-span-5">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                            className="font-heading text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-medium italic leading-[1.1] tracking-[-0.02em] text-white"
                        >
                            How we take
                            <br />
                            your business
                            <br />
                            to the next level
                        </motion.h2>
                    </div>

                    {/* Column 3: Description + CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:pt-1">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
                            className="text-white/50 text-[15px] lg:text-[16px] font-medium leading-[1.7] max-w-md"
                        >
                            We are a digital agency with expertise, and we&apos;re on a mission to help you
                            take the next step in your business. From brand identity to high-converting
                            websites, we engineer growth.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1.3, ease: EASE, delay: 0.6 }}
                        >
                            <Magnetic strength={0.3}>
                                <Link
                                    href="/services"
                                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/[0.12] hover:border-primary/60 bg-transparent hover:bg-primary/5 transition-all duration-700 text-white text-[14px] lg:text-[15px] font-bold tracking-tight"
                                >
                                    See all services
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── SERVICE ROWS ── */}
                <div className="flex flex-col">
                    {SERVICES.map((service, index) => (
                        <ServiceRow key={service.name} service={service} index={index} />
                    ))}
                    {/* Final bottom line */}
                    <div className="w-full h-px bg-white/[0.08]" />
                </div>

            </div>
        </section>
    );
}
