'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NewWorkPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '',
        client: '',
        year: new Date().getFullYear(),
        categories: '',
        tags: '',
        image: '',
        isFeatured: false,
        gridSize: 'medium',
        testimonialQuote: '',
        testimonialAuthor: '',
        testimonialRole: '',
        testimonialCompany: '',
    });

    const handleSubmit = async () => {
        if (!form.title || !form.client || !form.categories || !form.image) {
            alert('Please fill in the required fields: Title, Client, Categories, Image URL.');
            return;
        }

        setSaving(true);
        try {
            // Process comma-separated strings to arrays
            const payload = {
                title: form.title,
                client: form.client,
                year: Number(form.year),
                categories: form.categories.split(',').map(s => s.trim()).filter(Boolean),
                tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
                image: form.image,
                isFeatured: form.isFeatured,
                gridSize: form.gridSize,
                testimonial: form.testimonialQuote ? {
                    quote: form.testimonialQuote,
                    author: form.testimonialAuthor,
                    role: form.testimonialRole,
                    company: form.testimonialCompany,
                } : undefined
            };

            const res = await fetch('/api/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'Failed to create work');
                return;
            }

            router.push('/admin/works');
        } catch (error) {
            console.error('Error creating work:', error);
            alert('Failed to create work');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/works"
                        className="p-2 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] text-white/40 hover:text-white/60 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-heading font-bold text-white tracking-tight">New Project</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 active:scale-[0.98]"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Project'}
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
                {/* Basic Info */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Project title..."
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-transparent text-white text-3xl font-heading font-bold tracking-tight placeholder:text-white/15 focus:outline-none border-none border-0 px-0"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Client Name *</label>
                        <input
                            type="text"
                            value={form.client}
                            onChange={(e) => setForm({ ...form, client: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Year *</label>
                        <input
                            type="number"
                            value={form.year}
                            onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-primary/40 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Categories (comma separated) *</label>
                        <input
                            type="text"
                            placeholder="e.g. fashion, ecommerce, b2b"
                            value={form.categories}
                            onChange={(e) => setForm({ ...form, categories: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Services Tags (comma separated) *</label>
                        <input
                            type="text"
                            placeholder="e.g. Branding, Website, SEO"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                    </div>
                </div>

                {/* Media */}
                <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-white/25">Main Image URL *</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                    </div>
                    {form.image && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.06] max-w-sm">
                            <img src={form.image} alt="Preview" className="w-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 border border-white/[0.06] rounded-xl p-4 bg-white/[0.02]">
                        <label className="text-[12px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-2 mb-2">Display Settings</label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white/70 font-medium">Is Featured (shows at top)</span>
                            <input
                                type="checkbox"
                                checked={form.isFeatured}
                                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                                className="w-5 h-5 accent-primary bg-white/[0.04] border-white/[0.06] rounded"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-xs text-white/40 block mb-1">Grid Size</label>
                            <select
                                value={form.gridSize}
                                onChange={(e) => setForm({ ...form, gridSize: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white text-sm"
                            >
                                <option value="small" className="bg-[#1a1a1a]">Small</option>
                                <option value="medium" className="bg-[#1a1a1a]">Medium</option>
                                <option value="large" className="bg-[#1a1a1a]">Large</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.02] space-y-4">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                        Testimonial (Optional)
                    </label>
                    <textarea
                        placeholder="Quote..."
                        value={form.testimonialQuote}
                        onChange={(e) => setForm({ ...form, testimonialQuote: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Author Name"
                            value={form.testimonialAuthor}
                            onChange={(e) => setForm({ ...form, testimonialAuthor: e.target.value })}
                            className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-primary/40"
                        />
                        <input
                            type="text"
                            placeholder="Role (e.g. CEO)"
                            value={form.testimonialRole}
                            onChange={(e) => setForm({ ...form, testimonialRole: e.target.value })}
                            className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-primary/40"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={form.testimonialCompany}
                            onChange={(e) => setForm({ ...form, testimonialCompany: e.target.value })}
                            className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-primary/40"
                        />
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
