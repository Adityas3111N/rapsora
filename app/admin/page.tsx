'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Eye, PenLine } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Stats {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalUsers: number;
}

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<Stats>({ totalBlogs: 0, publishedBlogs: 0, draftBlogs: 0, totalUsers: 0 });
    const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const role = (session?.user as any)?.role;

    useEffect(() => {
        async function fetchData() {
            try {
                const [blogsRes, usersRes] = await Promise.all([
                    fetch('/api/blogs?limit=5'),
                    role === 'superadmin' ? fetch('/api/users') : Promise.resolve(null),
                ]);

                const blogsData = await blogsRes.json();
                let usersCount = 0;

                if (usersRes) {
                    const usersData = await usersRes.json();
                    usersCount = usersData.users?.length || 0;
                }

                const allBlogs = blogsData.blogs || [];
                const published = allBlogs.filter((b: any) => b.status === 'published').length;

                setStats({
                    totalBlogs: blogsData.pagination?.total || 0,
                    publishedBlogs: published,
                    draftBlogs: blogsData.pagination?.total - published || 0,
                    totalUsers: usersCount,
                });
                setRecentBlogs(allBlogs.slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [role]);

    const statCards = [
        { label: 'Total Posts', value: stats.totalBlogs, icon: FileText, color: 'from-violet-500/20 to-violet-600/5', iconColor: 'text-violet-400' },
        { label: 'Published', value: stats.publishedBlogs, icon: Eye, color: 'from-emerald-500/20 to-emerald-600/5', iconColor: 'text-emerald-400' },
        { label: 'Drafts', value: stats.draftBlogs, icon: PenLine, color: 'from-amber-500/20 to-amber-600/5', iconColor: 'text-amber-400' },
        ...(role === 'superadmin' ? [{ label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500/20 to-blue-600/5', iconColor: 'text-blue-400' }] : []),
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
            >
                <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
                    Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'}
                </h1>
                <p className="text-white/40 text-sm mt-1 font-medium">
                    Here&apos;s what&apos;s happening with your site today.
                </p>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 group hover:border-white/[0.1] transition-all duration-500"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                            </div>
                        </div>
                        <p className="text-3xl font-heading font-bold text-white tracking-tight">
                            {loading ? '—' : card.value}
                        </p>
                        <p className="text-white/30 text-[13px] font-medium mt-1">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                <Link
                    href="/admin/blogs/new"
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-500"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <PenLine className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-[15px]">Write New Post</p>
                            <p className="text-white/30 text-[13px]">Create and publish a new blog article</p>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/blogs"
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-all duration-500"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                            <FileText className="w-5 h-5 text-white/50" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-[15px]">Manage Posts</p>
                            <p className="text-white/30 text-[13px]">View, edit, or delete existing posts</p>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <h2 className="text-white font-semibold text-[15px]">Recent Posts</h2>
                    <Link href="/admin/blogs" className="text-primary text-[13px] font-medium hover:underline underline-offset-4">
                        View all →
                    </Link>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-white/30 text-sm">Loading...</div>
                ) : recentBlogs.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-white/30 text-sm">No blog posts yet.</p>
                        <Link href="/admin/blogs/new" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
                            Write your first post →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {recentBlogs.map(blog => (
                            <Link
                                key={blog._id}
                                href={`/admin/blogs/${blog._id}/edit`}
                                className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-[14px] font-medium truncate">{blog.title}</p>
                                    <p className="text-white/30 text-[12px] mt-0.5">{blog.category} · {blog.readTime}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                    blog.status === 'published'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-amber-500/10 text-amber-400'
                                }`}>
                                    {blog.status}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
