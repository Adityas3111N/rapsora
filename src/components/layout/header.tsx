'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import {
    Moon, Sun, ArrowUpRight, ChevronRight,
    X, Menu, Globe, Palette, ShoppingBag, TrendingUp, Figma, Users, UserCircle, MessageSquare,
    LogOut, LayoutDashboard,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTheme } from '@/hooks/useTheme';
import { siteConfig } from '@/constants/site';

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Globe, Palette, ShoppingBag, TrendingUp, Figma, Users, UserCircle, MessageSquare,
};

/* ─────────────────────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────────────────────── */
const navLinks = [
    {
        label: 'Services',
        href: '/services',
        count: 13,
        children: [
            { label: 'Web Design', description: 'Deliver your business to a wider audience', href: '/services/web-design', icon: 'Globe' },
            { label: 'Branding', description: "Creating brands you're proud of", href: '/services/branding', icon: 'Palette' },
            { label: 'E-Commerce', description: 'Custom stores that turn browsers into buyers', href: '/services/ecommerce', icon: 'ShoppingBag' },
            { label: 'SEO', description: 'Get your brand seen online', href: '/services/seo', icon: 'TrendingUp' },
            { label: 'UI / UX', description: 'Intuitive experiences that drive engagement', href: '/services/ui-ux', icon: 'Figma' },
        ],
        viewAll: { label: 'View all Services', href: '/services' },
    },
    { label: 'Work', href: '/work' },
    {
        label: 'About',
        href: '/about',
        children: [
            { label: 'About us', description: 'An award winning agency in Manchester', href: '/about' },
            { label: 'Meet the Team', description: 'Putting faces to names', href: '/about/team' },
            { label: 'Culture', description: 'How we do things around here', href: '/about/culture' },
            { label: 'Testimonials', description: 'What our clients say about us', href: '/about/testimonials' },
        ],
        viewAll: {
            label: 'Watch our Showreel',
            href: '/about',
            description: "Want a snippet of our work in under a minute? We've got just the thing for ya...",
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        },
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

type NavChild = { label: string; description: string; href: string; icon?: string };
type NavLinkItem = (typeof navLinks)[number];



import { GooeyCTA } from '@/components/shared/gooey-cta';

/* ─────────────────────────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────────────────────────── */
function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();
    if (!mounted) return <div className="h-9 w-9" aria-hidden />;

    return (
        <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/50 transition-all duration-200 hover:bg-foreground/[0.06] hover:text-foreground active:scale-90"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                >
                    {theme === 'dark'
                        ? <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} />
                        : <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} />
                    }
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

/* ─────────────────────────────────────────────────────────────
   DROPDOWN ITEM — simple title + description, no icon
───────────────────────────────────────────────────────────── */
function DropdownRow({ child, index }: { child: NavChild; index: number }) {
    const pathname = usePathname();
    const isActive = pathname === child.href;

    return (
        <motion.li
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04, ease: EASE }}
        >
            <Link
                href={child.href}
                className={cn(
                    'group/row block rounded-xl px-4 py-3',
                    'transition-colors duration-150 hover:bg-foreground/[0.04]',
                    isActive && 'bg-primary/[0.06]'
                )}
            >
                <p className={cn('text-[15px] font-semibold', isActive ? 'text-primary' : 'text-foreground')}>
                    {child.label}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                    {child.description}
                </p>
            </Link>
        </motion.li>
    );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP DROPDOWN PANEL — wide two-column like MadeByShape
───────────────────────────────────────────────────────────── */
function DesktopDropdown({
    link, isOpen, onOpen, onClose, onMouseEnter,
}: {
    link: NavLinkItem & { children: NavChild[] };
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
    const isActive = pathname.startsWith(link.href);

    const enter = () => { if (timerRef.current) clearTimeout(timerRef.current); onOpen(); };
    const leave = () => { timerRef.current = setTimeout(onClose, 200); };

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const hasViewAll = 'viewAll' in link && link.viewAll;

    return (
        <div className="relative" onMouseEnter={(e) => { enter(); onMouseEnter(e as any); }} onMouseLeave={leave}>
            {/* ── Trigger ── */}
            <Link
                href={link.href}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={cn(
                    'relative flex items-center gap-1 text-[17px] font-bold tracking-tight',
                    'transition-colors duration-150 hover:text-foreground focus-visible:outline-none',
                    isActive ? 'text-foreground' : 'text-foreground/70'
                )}
            >
                {link.label}

                {/* Count badge */}
                {'count' in link && (
                    <span
                        className="absolute -right-4 -top-3 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-white shadow-sm"
                        aria-label={`${link.count} services`}
                    >
                        {link.count}
                    </span>
                )}
            </Link>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1] // Custom quintic ease-out
                        }}
                        className={cn(
                            'absolute left-1/2 top-full z-[100] mt-4 w-[680px] -translate-x-1/2 overflow-hidden rounded-[2.5rem] border border-border/40 bg-white shadow-3xl dark:bg-[#1C1D1F]',
                            'transform-gpu backdrop-blur-3xl' // Use GPU for smoother scaling
                        )}
                    >
                        {/* Arrow tip */}
                        <div
                            className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-[1px] h-0 w-0 border-x-[7px] border-b-[8px] border-x-transparent"
                            style={{ borderBottomColor: 'var(--color-background, hsl(var(--background)))' }}
                            aria-hidden="true"
                        />

                        <div className="overflow-hidden rounded-2xl border border-border/50 bg-background shadow-[0_12px_48px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_48px_-8px_rgba(0,0,0,0.55)]">
                            <div className={cn(
                                'flex',
                                hasViewAll ? 'flex-row' : 'flex-col'
                            )}>
                                {/* Left column — service items */}
                                <ul className={cn(
                                    'flex-1 px-3 py-3',
                                    hasViewAll && 'border-r border-border/30'
                                )}>
                                    {link.children.map((child, i) => (
                                        <DropdownRow key={child.href} child={child} index={i} />
                                    ))}
                                </ul>

                                {/* Right column — card with image */}
                                {hasViewAll && (() => {
                                    const va = link.viewAll as { label: string; href: string; description?: string; image?: string };
                                    return (
                                        <div className="flex w-[260px] flex-col p-5">
                                            <Link href={va.href} className="group/va block">
                                                <p className="text-[16px] font-bold text-foreground">
                                                    {va.label}
                                                </p>
                                                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                                    {va.description || `Check out everything we offer here at RapSora`}
                                                </p>
                                            </Link>

                                            {/* Image with optional play button overlay */}
                                            <div className="group/img relative mt-4 overflow-hidden rounded-xl">
                                                <img
                                                    src={va.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'}
                                                    alt={va.label}
                                                    className="h-[160px] w-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                                {/* Play button — only for showreel-type cards */}
                                                {va.label.toLowerCase().includes('showreel') && (
                                                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#c8f547] shadow-lg">
                                                        <svg className="ml-0.5 h-4 w-4 text-[#111]" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PLAIN DESKTOP NAV LINK
───────────────────────────────────────────────────────────── */
function DesktopNavLink({
    link,
    isActive,
    isScrolled,
    onMouseEnter,
}: {
    link: NavLinkItem;
    isActive: boolean;
    isScrolled: boolean;
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}) {
    return (
        <Link
            href={link.href}
            onMouseEnter={onMouseEnter}
            className={cn(
                'relative text-[17px] font-bold tracking-tight px-4 py-2 rounded-full z-10',
                'transition-all duration-300 focus-visible:outline-none',
                isActive
                    ? 'text-primary'
                    : 'text-foreground/75 hover:text-foreground'
            )}
        >
            {link.label}
            {isActive && (
                <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-foreground"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
            )}
        </Link>
    );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────────────────────── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<string | null>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40,
                delay: 0.1 + i * 0.04
            },
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Panel — World Class Bottom Sheet Expansion */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100) onClose();
                        }}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 38,
                            mass: 0.8
                        }}
                        style={{ willChange: 'transform, opacity' }}
                        className="fixed inset-0 top-[10%] z-50 flex flex-col bg-white dark:bg-[#1C1D1F] rounded-t-[2.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.8)] outline-none"
                        role="dialog" aria-modal="true" aria-label="Site navigation"
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center p-4">
                            <div className="w-10 h-1 bg-foreground/10 rounded-full" />
                        </div>

                        {/* Top bar (Logo only for mobile sheet) */}
                        <div className="flex items-center justify-center px-6 py-2">
                            <Logo />
                        </div>

                        <div className="mx-6 h-px bg-border/40" />

                        {/* Links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-4">
                            <ul className="space-y-0.5">
                                {navLinks.map((link, i) => {
                                    const hasKids = 'children' in link;
                                    const isExp = expanded === link.label;
                                    const isActive = hasKids ? pathname.startsWith(link.href) : pathname === link.href;

                                    return (
                                        <motion.li key={link.href} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                                            {hasKids ? (
                                                <div>
                                                    <button
                                                        onClick={() => setExpanded(isExp ? null : link.label)}
                                                        className={cn(
                                                            'flex w-full items-center justify-between rounded-lg px-3 py-3',
                                                            'text-[15px] font-medium transition-colors hover:bg-foreground/[0.04]',
                                                            isActive ? 'text-foreground' : 'text-foreground/60'
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {link.label}
                                                            {'count' in link && (
                                                                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                                                                    {link.count}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <motion.div animate={{ rotate: isExp ? 90 : 0 }} transition={{ duration: 0.18 }}>
                                                            <ChevronRight className="h-4 w-4 opacity-40" strokeWidth={1.75} />
                                                        </motion.div>
                                                    </button>

                                                    <AnimatePresence initial={false}>
                                                        {isExp && (
                                                            <motion.ul
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.22, ease: EASE }}
                                                                className="overflow-hidden"
                                                            >
                                                                {(link as typeof navLinks[0]).children!.map((child) => {
                                                                    const iconKey = 'icon' in child ? (child as { icon?: string }).icon : undefined;
                                                                    const Icon = iconKey ? iconMap[iconKey] : null;
                                                                    return (
                                                                        <li key={child.href}>
                                                                            <Link
                                                                                href={child.href}
                                                                                className={cn(
                                                                                    'flex items-center gap-3 rounded-lg py-2.5 pl-5 pr-3',
                                                                                    'transition-colors hover:bg-foreground/[0.04]',
                                                                                    pathname === child.href ? 'text-primary' : 'text-foreground/55'
                                                                                )}
                                                                            >
                                                                                {Icon && (
                                                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                                                        <Icon className="h-3.5 w-3.5" />
                                                                                    </div>
                                                                                )}
                                                                                <div>
                                                                                    <p className="text-[13px] font-medium text-foreground/90">{child.label}</p>
                                                                                    <p className="text-[11px] text-muted-foreground">{child.description}</p>
                                                                                </div>
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </motion.ul>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className={cn(
                                                        'flex items-center rounded-lg px-3 py-3',
                                                        'text-[15px] font-medium transition-colors hover:bg-foreground/[0.04]',
                                                        isActive ? 'text-foreground' : 'text-foreground/60'
                                                    )}
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* CTA */}
                        <div className="border-t border-border/30 px-6 py-5">
                            <div className="flex w-full justify-center">
                                <GooeyCTA />
                            </div>
                            <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                                or email us at{' '}
                                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline underline-offset-2">
                                    {siteConfig.email}
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ─────────────────────────────────────────────────────────────
   USER AUTH BUTTON — Sign In / Avatar dropdown
───────────────────────────────────────────────────────────── */
function UserAuthButton() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (status === 'loading') {
        return <div className="h-9 w-9 rounded-full bg-foreground/[0.06] animate-pulse" />;
    }

    if (!session) {
        return (
            <Link
                href="/auth/signin"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold tracking-tight text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-300"
            >
                <UserCircle className="w-4 h-4" />
                Sign In
            </Link>
        );
    }

    const role = (session.user as any)?.role;
    const isAdmin = role === 'admin' || role === 'superadmin';

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full transition-all duration-300 hover:ring-2 hover:ring-primary/30 active:scale-95"
            >
                {session.user?.image ? (
                    <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                        {session.user?.name?.charAt(0) || 'U'}
                    </div>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="absolute right-0 top-full mt-3 w-[220px] rounded-2xl border border-border/40 bg-background shadow-xl dark:bg-[#1C1D1F] overflow-hidden z-[100]"
                    >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-border/30">
                            <p className="text-[13px] font-semibold text-foreground truncate">{session.user?.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{session.user?.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1.5">
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                            )}
                            <button
                                onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }); }}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] font-medium text-foreground/70 hover:text-red-500 hover:bg-red-500/[0.04] transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HEADER — Layout matches MadeByShape exactly:
   [Logo]  [Nav links centered]  [Theme]  [CTA pill+circle]
═══════════════════════════════════════════════════════════════ */
export function Header() {
    const pathname = usePathname();
    const { isScrolled, isHidden } = useScrollPosition(40, 0.6);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const isDiagnostic = pathname?.startsWith('/diagnostic');
    const navHidden = (isHidden && !mobileOpen && openDropdown === null) || isDiagnostic;

    if (isDiagnostic) return null;

    const [hoveredRect, setHoveredRect] = useState<{ left: number; width: number } | null>(null);
    const navRef = useRef<HTMLElement>(null);

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            setHoveredRect({
                left: rect.left - navRect.left,
                width: rect.width,
            });
        }
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setOpenDropdown(null); setMobileOpen(false); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {/* Outer wrapper — handles centering + slide hide/show */}
            <motion.div
                initial={false}
                animate={navHidden ? { y: '-100%' } : { y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={cn(
                    'fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu',
                    isScrolled ? 'px-4 sm:px-6' : 'px-0'
                )}
            >
                <motion.header
                    layout
                    initial={false}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 35,
                        mass: 1
                    }}
                    className={cn(
                        'w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform',
                        isScrolled
                            ? [
                                'h-[64px]',
                                'rounded-full',
                                'bg-white/70 dark:bg-[#1C1D1F]/80 backdrop-blur-md',
                                'border border-white/20 dark:border-transparent',
                                'shadow-[0_20px_50px_rgba(0,0,0,0.05)]',
                            ]
                            : [
                                'h-[80px]',
                                'rounded-none',
                                'bg-transparent',
                                'border border-transparent',
                                'shadow-none',
                            ]
                    )}
                    style={{
                        maxWidth: isScrolled ? 1200 : '100%',
                        marginTop: isScrolled ? 16 : 0,
                    }}
                >
                    <div className={cn(
                        'flex h-full items-center justify-between transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isScrolled ? 'px-6 sm:px-7' : 'px-8 sm:px-12'
                    )}>

                        {/* ── LEFT: Logo ────────────────────────────── */}
                        <Logo />

                        {/* ── CENTRE: Nav links ────────────────────── */}
                        <nav
                            ref={navRef}
                            onMouseLeave={() => setHoveredRect(null)}
                            className="relative hidden flex-1 items-center justify-center gap-8 lg:flex"
                            aria-label="Primary navigation"
                        >
                            <AnimatePresence>
                                {hoveredRect && (
                                    <motion.div
                                        layoutId="nav-hover-pill"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            left: hoveredRect.left - 12,
                                            width: hoveredRect.width + 24
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 450,
                                            damping: 35
                                        }}
                                        className="absolute top-1/2 -translate-y-1/2 h-10 bg-primary/5 rounded-full z-0"
                                    />
                                )}
                            </AnimatePresence>
                            {navLinks.map((link) => {
                                const hasKids = 'children' in link && Array.isArray((link as { children?: unknown }).children);
                                return hasKids ? (
                                    <DesktopDropdown
                                        key={link.href}
                                        link={link as Parameters<typeof DesktopDropdown>[0]['link']}
                                        isOpen={openDropdown === link.label}
                                        onOpen={() => setOpenDropdown(link.label)}
                                        onClose={() => setOpenDropdown(null)}
                                        onMouseEnter={handleLinkHover}
                                    />
                                ) : (
                                    <DesktopNavLink
                                        key={link.href}
                                        link={link}
                                        isActive={pathname === link.href}
                                        isScrolled={isScrolled}
                                        onMouseEnter={handleLinkHover}
                                    />
                                );
                            })}
                        </nav>

                        {/* ── RIGHT: Controls ──────────────────────── */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />

                            {/* Auth Button */}
                            <UserAuthButton />

                            {/* CTA — desktop */}
                            <div className="hidden lg:block lg:scale-[0.85] origin-right ml-2">
                                <GooeyCTA className="pt-1" />
                            </div>

                            {/* Hamburger — mobile — World Class Animated Toggle */}
                            <button
                                className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/[0.06] hover:text-foreground lg:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                            >
                                <div className="flex flex-col gap-1.5 items-center">
                                    <motion.span
                                        animate={{
                                            rotate: mobileOpen ? 45 : 0,
                                            y: mobileOpen ? 7 : 0,
                                            width: mobileOpen ? 20 : 20
                                        }}
                                        className="w-5 h-[2px] bg-current rounded-full origin-center"
                                    />
                                    <motion.span
                                        animate={{
                                            opacity: mobileOpen ? 0 : 1,
                                            x: mobileOpen ? 10 : 0
                                        }}
                                        className="w-5 h-[2px] bg-current rounded-full"
                                    />
                                    <motion.span
                                        animate={{
                                            rotate: mobileOpen ? -45 : 0,
                                            y: mobileOpen ? -7 : 0,
                                            width: mobileOpen ? 20 : 20
                                        }}
                                        className="w-5 h-[2px] bg-current rounded-full origin-center"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.header>
            </motion.div>

            {/* ── Sticky Conversion Hook — mobile ── */}
            <AnimatePresence>
                {!mobileOpen && (
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 38,
                            delay: 0.8
                        }}
                        className="fixed bottom-6 lg:bottom-8 left-1/2 lg:left-auto lg:right-8 -translate-x-1/2 lg:translate-x-0 z-[60] w-auto max-w-[92%] pointer-events-auto"
                    >
                        <Link
                            href="/diagnostic"
                            className="group relative flex items-center gap-4 px-6 py-3 bg-primary rounded-[1.25rem] shadow-[0_15px_40px_rgba(var(--primary-rgb),0.35)] active:scale-95 transition-all duration-300 overflow-hidden border border-white/20"
                        >
                            {/* Cinematic Shimmer Effect */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                                className="absolute inset-x-0 inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                            />

                            <div className="relative flex flex-col items-start mr-1">
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/50 leading-none mb-1">
                                    THE GROWTH BLUEPRINT
                                </span>
                                <p className="text-[14px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                                    Unlock My <span className="text-white underline decoration-white/40 underline-offset-4 font-black italic">5X Revenue</span> Plan.
                                </p>
                            </div>

                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-primary group-hover:rotate-12 group-hover:scale-110">
                                <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                            </div>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
        </>
    );
}
