'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Image } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
    'Web Design',
    'Branding',
    'E-Commerce',
    'SEO',
    'UI/UX',
    'Development',
    'Marketing',
    'Case Study',
];

export default function NewBlogPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: CATEGORIES[0],
        coverImage: '',
    });

    const handleSubmit = async (status: 'draft' | 'published') => {
        if (!form.title || !form.excerpt || !form.content) {
            alert('Please fill in the title, excerpt, and content.');
            return;
        }

        setSaving(true);
        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, status }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'Failed to create post');
                return;
            }

            router.push('/admin/blogs');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        } finally {
            setSaving(false);
        }
    };

    const wordCount = form.content.split(/\s+/).filter(Boolean).length;
    const readTime = Math.ceil(wordCount / 200) || 1;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blogs"
                        className="p-2 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] text-white/40 hover:text-white/60 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-heading font-bold text-white tracking-tight">New Blog Post</h1>
                        <p className="text-white/30 text-[13px] mt-0.5">{wordCount} words · {readTime} min read</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSubmit('draft')}
                        disabled={saving}
                        className="px-4 py-2 rounded-xl border border-white/[0.08] text-white/60 text-sm font-semibold hover:bg-white/[0.04] transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('published')}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 active:scale-[0.98]"
                    >
                        <Eye className="w-4 h-4" />
                        Publish
                    </button>
                </div>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="space-y-6"
            >
                {/* Title */}
                <div>
                    <input
                        type="text"
                        placeholder="Post title..."
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-transparent text-white text-3xl font-heading font-bold tracking-tight placeholder:text-white/15 focus:outline-none border-none"
                    />
                </div>

                {/* Meta row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-primary/40 transition-colors appearance-none"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} className="bg-[#1a1a1a]">{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Cover Image URL</label>
                        <div className="relative">
                            <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="text"
                                placeholder="https://images.unsplash.com/..."
                                value={form.coverImage}
                                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Excerpt</label>
                    <textarea
                        placeholder="A brief summary of your post..."
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors resize-none leading-relaxed"
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Content (Markdown)</label>
                    <textarea
                        placeholder="Write your blog post content here... Supports Markdown formatting."
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={20}
                        className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-white text-[15px] placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors resize-y leading-[1.8] font-[family-name:var(--font-mono)]"
                    />
                </div>
            </motion.div>
        </div>
    );
}
