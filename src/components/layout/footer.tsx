'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Twitter, Linkedin, Instagram, Github, Dribbble } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/constants/site';
import { GooeyCTA } from '@/components/shared/gooey-cta';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const ANIMATED_UNDERLINE = "relative inline-block after:absolute after:-bottom-[2px] after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300 after:ease-out";


    const socialLinks = [
        { icon: Linkedin, href: siteConfig.socials?.linkedin || '#', label: 'LinkedIn', colorClass: 'hover:bg-[#0A66C2] active:bg-[#0A66C2] hover:text-white active:text-white' },
        { icon: Twitter, href: siteConfig.socials?.twitter || '#', label: 'Twitter', colorClass: 'hover:bg-[#1DA1F2] active:bg-[#1DA1F2] hover:text-white active:text-white' },
        { icon: Github, href: siteConfig.socials?.github || '#', label: 'GitHub', colorClass: 'hover:bg-[#181717] active:bg-[#181717] hover:text-white active:text-white' },
        { icon: Instagram, href: siteConfig.socials?.instagram || '#', label: 'Instagram', colorClass: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] active:bg-gradient-to-tr active:from-[#f9ce34] active:via-[#ee2a7b] active:to-[#6228d7] hover:text-white active:text-white' },
        { icon: Dribbble, href: siteConfig.socials?.dribbble || '#', label: 'Dribbble', colorClass: 'hover:bg-[#EA4C89] active:bg-[#EA4C89] hover:text-white active:text-white' },
    ];

    return (
        <footer className="relative bg-black pt-0" aria-label="Site footer">

            <div className="relative w-full mx-auto max-w-[1920px]">

                {/* ── Main Dark Container ── */}
                <div className="relative bg-black dark:bg-[#1A1B1E] text-white overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[4rem] md:rounded-tl-none lg:rounded-tl-none min-h-[500px]">

                    {/* ── Top Right Decorative Tab ── */}
                    <div className="absolute top-0 right-4 lg:right-12 flex items-end -translate-y-[99%] z-20">
                        {/* Inverse corner connecting tab to left */}
                        <svg viewBox="0 0 52 52" fill="currentColor" className="w-[32px] h-[32px] text-black dark:text-[#1A1B1E] rotate-180 translate-x-[1px]">
                            <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                        </svg>

                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-black dark:bg-[#1A1B1E] h-12 px-6 flex items-center justify-center rounded-t-3xl cursor-pointer hover:bg-black/90 dark:hover:bg-[#1A1B1E]/90 transition-colors">
                            <span className="text-[13px] font-medium text-white whitespace-nowrap">
                                Sh*t I&apos;ve gone too far, send me back up 👆
                            </span>
                        </button>

                        {/* Inverse corner connecting tab to right */}
                        <svg viewBox="0 0 52 52" fill="currentColor" className="w-[32px] h-[32px] text-black dark:text-[#1A1B1E] -rotate-90 -translate-x-[1px]">
                            <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                        </svg>
                    </div>

                    {/* ── Top Left Cutout (Social Pill) ── */}
                    {/* Replicates the 'Shape' style floating fixed block on the left by 'cutting out' the footer background. */}
                    <div className="absolute top-0 left-0 bg-background rounded-br-[2.5rem] lg:rounded-br-[3rem] w-16 lg:w-24 hidden md:flex flex-col items-center py-6 gap-4 z-10 border-r border-b border-transparent">
                        {socialLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    "w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300",
                                    link.colorClass
                                )}
                                aria-label={link.label}
                                data-cursor-ignore="true"
                            >
                                <link.icon className="w-4 h-4" />
                            </a>
                        ))}

                        {/* INVERSE CORNER: Blends cutout bottom edge to footer left vertical edge */}
                        <svg viewBox="0 0 52 52" fill="currentColor" className="absolute -bottom-[31.9px] lg:-bottom-[51.9px] left-0 w-[32px] h-[32px] lg:w-[52px] lg:h-[52px] text-background rotate-0">
                            <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                        </svg>
                        {/* INVERSE CORNER: Blends cutout right edge to footer top horizontal edge */}
                        <svg viewBox="0 0 52 52" fill="currentColor" className="absolute top-0 -right-[31.9px] lg:-right-[51.9px] w-[32px] h-[32px] lg:w-[52px] lg:h-[52px] text-background rotate-0">
                            <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                        </svg>
                    </div>


                    {/* ── Grid Content ── */}
                    <div className="px-6 sm:px-12 lg:px-24 pt-12 lg:pt-32 pb-16 lg:pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 max-w-[1400px] mx-auto ml-0 md:ml-12 lg:ml-28">

                        {/* Column 1: CTA */}
                        <div className="lg:col-span-5 flex flex-col items-start pr-8">
                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.05] mb-8 lg:mb-10 text-white">
                                Do you like<br />what you see?
                            </h2>

                            <GooeyCTA className="mb-6" />

                            <div className="mt-10">
                                <p className="text-[13px] text-white/50 font-medium tracking-wide">5.0 from 69 reviews</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="font-bold text-lg tracking-tighter text-[#4285F4]">G</span>
                                    <div className="flex gap-0.5 text-[#FABB05]">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Learn */}
                        <div className="lg:col-span-2">
                            <h3 className="text-[15px] font-medium text-white/50 mb-6">Learn</h3>
                            <ul className="space-y-3.5">
                                {[
                                    { name: 'About', href: '/about' },
                                    { name: 'Culture', href: '/about#our-culture' },
                                    { name: 'Testimonials', href: '/testimonials' },
                                    { name: 'Blog', href: '/blog' }
                                ].map(item => (
                                    <li key={item.name}>
                                        <Link href={item.href} className={cn("text-[17px] font-medium text-white hover:text-primary transition-colors", ANIMATED_UNDERLINE)}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Explore */}
                        <div className="lg:col-span-2">
                            <h3 className="text-[15px] font-medium text-white/50 mb-6">Explore</h3>
                            <ul className="space-y-3.5">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Work', href: '/work' },
                                    { name: 'Services', href: '/services' },
                                    { name: 'Careers', href: '/contact' },
                                    { name: 'Sectors', href: '/services' },
                                    { name: 'Contact', href: '/contact' }
                                ].map(item => (
                                    <li key={item.name}>
                                        <Link href={item.href} className={cn("flex items-center gap-3 text-[17px] font-medium text-white hover:text-primary transition-colors w-fit", ANIMATED_UNDERLINE)}>
                                            {item.name}
                                            {item.name === 'Work' && (
                                                <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div className="lg:col-span-3">
                            <h3 className="text-[15px] font-medium text-white/50 mb-6">Get in touch</h3>
                            <div className="space-y-6">
                                <a href={`tel:${siteConfig.phone?.replace(/\s/g, '') || '01942894596'}`} className={cn("flex items-center gap-4 text-[17px] font-medium text-white hover:text-primary transition-colors group w-fit", ANIMATED_UNDERLINE)}>
                                    <Phone className="h-4 w-4 text-white/60 group-hover:text-primary transition-colors" />
                                    {siteConfig.phone || '01942 894 596'}
                                </a>
                                <a href={`mailto:${siteConfig.email}`} className={cn("flex items-center gap-4 text-[17px] font-medium text-white hover:text-primary transition-colors group w-fit", ANIMATED_UNDERLINE)}>
                                    <Mail className="h-4 w-4 text-white/60 group-hover:text-primary transition-colors" />
                                    {siteConfig.email || 'hello@rapsora.com'}
                                </a>

                                <div className="flex gap-4 pt-2">
                                    <MapPin className="h-4 w-4 text-white/60 shrink-0 mt-1" />
                                    <address className="not-italic text-[17px] font-medium leading-[1.6] text-white/90">
                                        RapSora Studio<br />
                                        Chhuniganj Area<br />
                                        Kanpur, UP<br />
                                        India<br />
                                        <span className="text-white/40 text-[15px] mt-2 flex items-center gap-2">
                                            <div className="w-4 h-4 bg-white/30 rounded-sm flex items-center justify-center shrink-0">
                                                <div className="w-1.5 h-1.5 bg-white/80 rounded-sm" />
                                            </div>
                                            ///topped.little.pirate
                                        </span>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Massive Typography ── */}
                    <div className="w-full relative pb-8 border-b border-white/10 mb-8 overflow-hidden">
                        <h2
                            className="font-heading font-medium tracking-tight text-center text-white mix-blend-plus-lighter opacity-90 pb-8"
                            style={{ fontSize: 'clamp(5rem, 16vw, 20rem)', lineHeight: '0.8' }}
                        >
                            Crafting since 2024
                        </h2>
                    </div>

                    {/* ── Sub Footer (Single Line on Desktop) ── */}
                    <div className="px-8 lg:px-16 pb-12 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 text-[14px] text-white/50 font-medium max-w-7xl mx-auto">
                        <div className="flex items-center gap-6">
                            <span className="font-heading text-2xl font-bold text-white tracking-tight">RapSora.</span>
                            <span className="hidden xl:inline">© RapSora Ltd {currentYear}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            <span className="xl:hidden">© RapSora Ltd {currentYear}</span>
                            <span className="hidden sm:inline text-white/20">|</span>
                            <span>Company Reg Number 10529058</span>

                            <div className="hidden xl:flex items-center gap-x-6">
                                <span className="text-white/20">|</span>
                                <span>Web Design Agency</span>
                                <span className="text-white/20">|</span>
                                <span>All Rights Reserved</span>
                                <span className="text-white/20">|</span>
                                <Link href="/privacy" className={cn("hover:text-white transition-colors", ANIMATED_UNDERLINE)}>Privacy Policy</Link>
                            </div>
                        </div>

                        {/* Mobile stack for the rest of links */}
                        <div className="flex xl:hidden flex-wrap items-center gap-x-6 gap-y-3">
                            <span>Web Design Agency</span>
                            <span className="hidden sm:inline text-white/20">|</span>
                            <span>All Rights Reserved</span>
                            <span className="hidden sm:inline text-white/20">|</span>
                            <Link href="/privacy" className={cn("hover:text-white transition-colors", ANIMATED_UNDERLINE)}>Privacy Policy</Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
