'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminWorksPage() {
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/works');
            const data = await res.json();
            if (data.works) {
                setWorks(data.works);
            }
        } catch (error) {
            console.error('Failed to fetch works:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            const res = await fetch(`/api/works/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setWorks(works.filter(w => w._id !== id));
            }
        } catch (error) {
            console.error('Error deleting work:', error);
        }
    };

    const filteredWorks = works.filter(w => 
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        w.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search works..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111113] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                    />
                </div>
                <Link
                    href="/admin/works/new"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New Project
                </Link>
            </div>

            {/* Table */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-[13px] text-left">
                        <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/40 uppercase tracking-wider font-semibold text-[11px]">
                            <tr>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06]">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                                        Loading projects...
                                    </td>
                                </tr>
                            ) : filteredWorks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                                        {searchTerm ? 'No projects matched your search.' : 'No projects found. Add your first portfolio piece!'}
                                    </td>
                                </tr>
                            ) : (
                                filteredWorks.map((work) => (
                                    <motion.tr 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        key={work._id} 
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {work.image ? (
                                                    <img src={work.image} alt={work.title} className="w-12 h-10 object-cover rounded-lg bg-white/5" />
                                                ) : (
                                                    <div className="w-12 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                                        <ImageIcon className="w-4 h-4 text-white/20" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-white text-[14px]">{work.title}</p>
                                                    <p className="text-white/40 text-[12px]">{work.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/60">
                                            {work.client}
                                        </td>
                                        <td className="px-6 py-4 text-white/60">
                                            {work.year}
                                        </td>
                                        <td className="px-6 py-4">
                                            {work.isFeatured ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                                    Standard
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/works/${work._id}/edit`}
                                                    className="p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(work._id, work.title)}
                                                    className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
