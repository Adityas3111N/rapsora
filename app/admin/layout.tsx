'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Users,
    LogOut,
    ChevronRight,
    Menu,
    X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const sidebarLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Works', href: '/admin/works', icon: Briefcase },
    { label: 'Blog Posts', href: '/admin/blogs', icon: FileText },
    { label: 'Users', href: '/admin/users', icon: Users, superAdminOnly: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const role = (session?.user as any)?.role;
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isSuperAdmin = role === 'superadmin';

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        } else if (status === 'authenticated' && !isAdmin) {
            router.push('/');
        }
    }, [status, isAdmin, router]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-white/40 text-sm font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex">
            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] bg-[#111113] border-r border-white/[0.06]
                flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Brand */}
                <div className="px-6 py-6 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white font-bold text-[15px] tracking-tight">RapSora</p>
                                <p className="text-white/30 text-[11px] font-medium">Admin Panel</p>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/[0.04] text-white/40"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/20">
                        Navigation
                    </p>
                    {sidebarLinks
                        .filter(link => !link.superAdminOnly || isSuperAdmin)
                        .map(link => {
                            const isActive = pathname === link.href || (link.href !== '/admin' && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-300
                                        ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                                        }
                                    `}
                                >
                                    <link.icon className={`w-[18px] h-[18px] ${isActive ? 'text-primary' : 'text-white/30 group-hover:text-white/50'}`} />
                                    {link.label}
                                    {isActive && (
                                        <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary/50" />
                                    )}
                                </Link>
                            );
                        })}
                </nav>

                {/* User */}
                <div className="px-3 py-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.02]">
                        {session?.user?.image ? (
                            <img
                                src={session.user.image}
                                alt={session.user.name || ''}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                                {session?.user?.name?.charAt(0) || 'A'}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-[13px] font-semibold truncate">{session?.user?.name}</p>
                            <p className="text-white/30 text-[11px] capitalize">{role}</p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="p-2 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-red-400 transition-colors"
                            title="Sign out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/[0.04]">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/[0.04] text-white/40"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="hidden lg:block">
                        <p className="text-white/60 text-[13px] font-medium">
                            {pathname === '/admin' && 'Dashboard Overview'}
                            {pathname === '/admin/works' && 'Works Management'}
                            {pathname?.startsWith('/admin/works/new') && 'New Work'}
                            {pathname?.match(/\/admin\/works\/.*\/edit/) && 'Edit Work'}
                            {pathname === '/admin/blogs' && 'Blog Management'}
                            {pathname?.startsWith('/admin/blogs/new') && 'New Blog Post'}
                            {pathname?.match(/\/admin\/blogs\/.*\/edit/) && 'Edit Blog Post'}
                            {pathname === '/admin/users' && 'User Management'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            target="_blank"
                            className="text-[12px] font-semibold text-white/30 hover:text-white/60 transition-colors"
                        >
                            View Site ↗
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
