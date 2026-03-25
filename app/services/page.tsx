'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Magnetic } from '@/components/shared/magnetic';
import { GooeyCTA } from '@/components/shared/gooey-cta';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   SERVICE CATEGORIES DATA — Rapsora's Core Offerings
───────────────────────────────────────────────────────────── */
const SERVICE_CATEGORIES = [
    {
        title: 'Design',
        description:
            'Brand designers and web designers in-house crafting visuals to match your brand values.',
        services: [
            { number: '01', name: 'Brand Identity', href: '/services/branding' },
            { number: '02', name: 'Web Design', href: '/services/web-design' },
            { number: '03', name: 'UI/UX Design', href: '/services/ui-ux' },
            { number: '04', name: 'Graphic Design', href: '/services/graphic-design' },
            { number: '05', name: 'Motion Design', href: '/services/motion-design' },
        ],
    },
    {
        title: 'Develop',
        description:
            'Our engineers build blazing-fast, scalable websites and applications engineered for growth.',
        services: [
            { number: '01', name: 'Web Development', href: '/services/web-development' },
            { number: '02', name: 'E-Commerce', href: '/services/ecommerce' },
            { number: '03', name: 'Custom Platforms', href: '/services/custom-platforms' },
            { number: '04', name: 'CMS Integration', href: '/services/cms' },
            { number: '05', name: 'API Development', href: '/services/api-development' },
        ],
    },
    {
        title: 'Marketing',
        description:
            'Data-driven growth strategies that compound over time to engineer sustainable revenue systems.',
        services: [
            { number: '01', name: 'SEO & Organic Growth', href: '/services/seo' },
            { number: '02', name: 'Content Strategy', href: '/services/content-strategy' },
            { number: '03', name: 'Social Media', href: '/services/social-media' },
            { number: '04', name: 'Email Marketing', href: '/services/email-marketing' },
        ],
    },
    {
        title: 'Support',
        description:
            'Lean on our in-house team for ongoing support with your design, development, and growth needs.',
        services: [
            { number: '01', name: 'Website Maintenance', href: '/services/maintenance' },
            { number: '02', name: 'Hosting & Security', href: '/services/hosting' },
            { number: '03', name: 'Analytics & Reporting', href: '/services/analytics' },
            { number: '04', name: 'Consultation', href: '/services/consultation' },
        ],
    },
];

const TRUST_STATS = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Retention' },
    { value: '5X', label: 'Avg. Revenue Growth' },
    { value: '24/7', label: 'Dedicated Support' },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED SERVICE ROW
───────────────────────────────────────────────────────────── */
function ServiceRow({ service, index, categoryIndex }: {
    service: { number: string; name: string; href: string };
    index: number;
    categoryIndex: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
        >
            <Link href={service.href} className="group block">
                <div className="flex items-center justify-between py-5 lg:py-6 border-b border-foreground/[0.06] dark:border-white/[0.06] group-hover:border-primary/30 transition-colors duration-700">
                    <div className="flex items-center gap-6 lg:gap-10">
                        <span className="text-muted-foreground/40 dark:text-white/20 text-[13px] font-bold tabular-nums tracking-wider w-6">
                            {service.number}
                        </span>
                        <h4 className="text-foreground dark:text-white text-[1.1rem] lg:text-[1.25rem] font-bold tracking-tight group-hover:text-primary transition-colors duration-500">
                            {service.name}
                        </h4>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-primary/[0.08] group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-primary group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE CATEGORY BLOCK — Giant heading + description + rows
───────────────────────────────────────────────────────────── */
function CategoryBlock({ category, index }: {
    category: typeof SERVICE_CATEGORIES[0];
    index: number;
}) {
    const ref = useRef(null);
    const titleRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
    const isTitleInView = useInView(titleRef, { once: true, margin: '-5% 0px' });

    return (
        <section ref={ref} className="py-16 lg:py-24">
            {/* Heading at the top */}
            <div className="mb-10 lg:mb-16">
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 60 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="font-heading text-[5.5rem] sm:text-[8rem] lg:text-[11rem] xl:text-[14rem] 2xl:text-[18rem] font-bold leading-[0.8] tracking-[-0.051em] text-foreground dark:text-white"
                >
                    {category.title}
                </motion.h2>
            </div>

            {/* Content below the heading */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Left: Description */}
                <div className="lg:col-span-5 xl:col-span-5">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                        className="text-foreground/80 dark:text-white/80 text-[1.8rem] sm:text-[2rem] lg:text-[2.2rem] font-medium leading-[1.3] tracking-tight max-w-sm"
                    >
                        {category.description}
                    </motion.p>
                </div>

                {/* Right: Service Rows */}
                <div className="lg:col-span-7 xl:col-span-7 lg:pt-0">
                    {category.services.map((service, i) => (
                        <ServiceRow
                            key={service.name}
                            service={service}
                            index={i}
                            categoryIndex={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────────────────────────── */
function StatBlock({ stat, index }: { stat: typeof TRUST_STATS[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: EASE, delay: index * 0.1 }}
            className="text-center lg:text-left"
        >
            <p className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-primary">
                {stat.value}
            </p>
            <p className="mt-2 text-muted-foreground dark:text-white/40 text-[14px] font-medium">
                {stat.label}
            </p>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SERVICES PAGE
═══════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true, margin: '-5% 0px' });

    const { scrollYProgress } = useScroll();
    const parallaxY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

    return (
        <main className="bg-background dark:bg-black">
            {/* ── HERO SECTION ── */}
            <section className="relative w-full pt-32 lg:pt-44 pb-16 lg:pb-24 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
                    <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
                            className="lg:col-span-2 flex items-start pt-3"
                        >
                            <div className="flex items-center gap-3 text-muted-foreground dark:text-white/60 font-bold tracking-tight text-[14px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Services
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            className="lg:col-span-5"
                            style={{ y: parallaxY }}
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
                                className="font-heading text-[2.5rem] sm:text-[3rem] lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-foreground dark:text-white"
                            >
                                We&apos;re a digital
                                <br />
                                agency with
                                <br />
                                <span className="italic font-medium text-primary">expertise</span>
                            </motion.h1>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            className="lg:col-span-5 flex flex-col justify-end"
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
                        >
                            <p className="text-muted-foreground dark:text-white/45 text-[16px] lg:text-[17px] font-medium leading-[1.8] max-w-md">
                                We bring our passion for exceptional design to ambitious brands — and deliver results you can shout about. From identity to infrastructure, we build digital empires.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── SERVICE CATEGORIES ── */}
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
                {SERVICE_CATEGORIES.map((category, index) => (
                    <CategoryBlock key={category.title} category={category} index={index} />
                ))}
            </div>

            {/* ── TRUST & SOCIAL PROOF SECTION ── */}
            <section className="relative w-full bg-foreground dark:bg-white/[0.03] py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
                
                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative">
                    {/* Section Header */}
                    <div className="text-center mb-16 lg:mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.2, ease: EASE }}
                            className="inline-flex items-center gap-3 text-background/60 dark:text-white/60 font-bold tracking-tight text-[14px] mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Why RapSora
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
                            className="font-heading text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-bold tracking-[-0.03em] text-background dark:text-white leading-[1.1]"
                        >
                            Numbers that speak
                            <br />
                            <span className="italic font-medium text-primary">louder than words</span>
                        </motion.h2>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {TRUST_STATS.map((stat, i) => (
                            <StatBlock key={stat.label} stat={stat} index={i} />
                        ))}
                    </div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                        className="mt-16 lg:mt-24 flex flex-wrap items-center justify-center gap-8 lg:gap-12"
                    >
                        {['Google Partner', 'Shopify Expert', 'Clutch Top Agency', 'Webflow Professional'].map((badge, i) => (
                            <motion.div
                                key={badge}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                                className="flex items-center gap-2 text-background/20 dark:text-white/20 text-[13px] font-bold uppercase tracking-wider"
                            >
                                <div className="w-2 h-2 rounded-full bg-primary/40" />
                                {badge}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── PROCESS SECTION ── */}
            <section className="w-full py-20 lg:py-32">
                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.2, ease: EASE }}
                            >
                                <div className="flex items-center gap-3 text-muted-foreground dark:text-white/60 font-bold tracking-tight text-[14px] mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Our Process
                                </div>
                                <h2 className="font-heading text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] text-foreground dark:text-white leading-[1.1]">
                                    From brief to
                                    <br />
                                    <span className="italic font-medium">brilliant</span>
                                </h2>
                                <p className="mt-6 text-muted-foreground dark:text-white/40 text-[15px] font-medium leading-[1.8] max-w-sm">
                                    Every project follows our battle-tested process, designed to maximise impact and minimise friction. No surprises — just results.
                                </p>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7">
                            {[
                                { step: '01', title: 'Discovery & Strategy', description: 'Deep-dive into your business, audience, and goals. We uncover what makes you unique and build a strategy around it.' },
                                { step: '02', title: 'Design & Prototype', description: 'We craft stunning visual concepts and interactive prototypes. Every pixel is intentional, every interaction purposeful.' },
                                { step: '03', title: 'Develop & Build', description: 'Clean, performant code brought to life. We build with speed, accessibility, and scalability baked in from day one.' },
                                { step: '04', title: 'Launch & Grow', description: 'We don\'t disappear after launch. Ongoing optimization, analytics, and support to ensure sustained growth.' },
                            ].map((item, index) => {
                                const ref = useRef(null);
                                const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
                                return (
                                    <motion.div
                                        key={item.step}
                                        ref={ref}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 1, ease: EASE, delay: index * 0.1 }}
                                        className="flex gap-6 py-8 border-b border-foreground/[0.06] dark:border-white/[0.06] last:border-none"
                                    >
                                        <span className="text-primary font-heading text-[2rem] lg:text-[2.5rem] font-bold leading-none tracking-tight">
                                            {item.step}
                                        </span>
                                        <div>
                                            <h3 className="text-foreground dark:text-white text-[1.15rem] lg:text-[1.3rem] font-bold tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-muted-foreground dark:text-white/35 text-[14px] lg:text-[15px] font-medium leading-[1.7] max-w-md">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="relative w-full bg-black py-20 lg:py-40 mb-20 lg:mb-32 overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.03] blur-[200px] rounded-full pointer-events-none" />

                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.4, ease: EASE }}
                    >
                        <h2 className="font-heading text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold tracking-[-0.03em] text-white leading-[1.05]">
                            Ready to build
                            <br />
                            something{' '}
                            <span className="italic font-medium text-primary">extraordinary</span>?
                        </h2>
                        <p className="mt-6 text-white/40 text-[16px] lg:text-[17px] font-medium leading-[1.7] max-w-lg mx-auto">
                            Let&apos;s talk about your project. We&apos;ll show you exactly how we can help you dominate your market.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12"
                    >
                        <Magnetic strength={0.3}>
                            <GooeyCTA text="Start a Project" href="/contact" />
                        </Magnetic>
                        <Magnetic strength={0.3}>
                            <Link
                                href="/diagnostic"
                                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.1] text-white/70 text-[15px] font-bold tracking-tight hover:border-white/[0.2] hover:text-white transition-all duration-500"
                            >
                                Free Growth Audit
                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                            </Link>
                        </Magnetic>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
