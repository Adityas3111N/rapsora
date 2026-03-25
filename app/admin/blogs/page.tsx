'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit3, Eye } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchBlogs = async () => {
        try {
            const params = new URLSearchParams();
            if (filterStatus) params.set('status', filterStatus);
            params.set('limit', '50');
            const res = await fetch(`/api/blogs?${params}`);
            const data = await res.json();
            setBlogs(data.blogs || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, [filterStatus]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        setDeleting(id);
        try {
            await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            setBlogs(blogs.filter(b => b._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        } finally {
            setDeleting(null);
        }
    };

    const filtered = blogs.filter(b =>
        b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Blog Posts</h1>
                    <p className="text-white/40 text-sm mt-1">{blogs.length} total posts</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-3"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    {['', 'published', 'draft'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 ${
                                filterStatus === status
                                    ? 'bg-primary/15 text-primary border border-primary/30'
                                    : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/60'
                            }`}
                        >
                            {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
                {loading ? (
                    <div className="p-12 text-center text-white/30 text-sm">Loading posts...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-white/30 text-sm mb-3">
                            {searchQuery ? 'No posts match your search.' : 'No blog posts yet.'}
                        </p>
                        {!searchQuery && (
                            <Link href="/admin/blogs/new" className="text-primary text-sm font-medium hover:underline">
                                Write your first post →
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {/* Header row */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white/20">
                            <div className="col-span-5">Title</div>
                            <div className="col-span-2">Category</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-1">Actions</div>
                        </div>
                        {filtered.map(blog => (
                            <div
                                key={blog._id}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-center"
                            >
                                <div className="lg:col-span-5">
                                    <p className="text-white text-[14px] font-medium truncate">{blog.title}</p>
                                    <p className="text-white/25 text-[12px] mt-0.5 truncate">{blog.excerpt}</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <span className="text-white/40 text-[13px]">{blog.category}</span>
                                </div>
                                <div className="lg:col-span-2">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                        blog.status === 'published'
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-amber-500/10 text-amber-400'
                                    }`}>
                                        {blog.status}
                                    </span>
                                </div>
                                <div className="lg:col-span-2">
                                    <span className="text-white/30 text-[13px]">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="lg:col-span-1 flex items-center gap-2">
                                    <Link
                                        href={`/admin/blogs/${blog._id}/edit`}
                                        className="p-2 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        disabled={deleting === blog._id}
                                        className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
