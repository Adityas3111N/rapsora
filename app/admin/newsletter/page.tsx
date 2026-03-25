'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Download, RefreshCw, Send, X, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function NewsletterAdmin() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Newsletter Drafting
    const [isDrafting, setIsDrafting] = useState(false);
    const [draft, setDraft] = useState({ subject: '', content: '' });
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/newsletter');
            const data = await res.json();
            if (data.success) {
                setSubscribers(data.data);
            }
        } catch (error) {
            console.error('Error fetching subscribers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft.subject || !draft.content) return;
        
        setSending(true);
        try {
            const res = await fetch('/api/newsletter/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(draft)
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMessage(data.message);
                setDraft({ subject: '', content: '' });
                setTimeout(() => {
                    setSuccessMessage(null);
                    setIsDrafting(false);
                }, 3000);
            } else {
                alert(data.error || 'Failed to send');
            }
        } catch (error) {
            alert('Something went wrong');
        } finally {
            setSending(false);
        }
    };

    const exportCSV = () => {
        const headers = ['Email,SubscribedAt'];
        const csv = headers.concat(
            subscribers.map((s) => `${s.email},${new Date(s.subscribedAt || s.createdAt).toISOString()}`)
        ).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapsora_subscribers_${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Newsletter Subscribers</h1>
                    <p className="text-white/50 text-sm">Manage users who have signed up to receive updates.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchSubscribers}
                        className="p-2.5 rounded-xl border border-white/5 hover:bg-white/[0.04] text-white/50 transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={exportCSV}
                        disabled={subscribers.length === 0}
                        className="p-2.5 rounded-xl border border-white/5 hover:bg-white/[0.04] text-white/50 transition-colors"
                        title="Export CSV"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsDrafting(true)}
                        disabled={subscribers.length === 0}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Send className="w-4 h-4" />
                        Compose & Broadcast
                    </button>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="w-full flex items-center justify-center p-12 bg-[#111113] border border-white/[0.04] rounded-2xl">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
            ) : subscribers.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center p-12 bg-[#111113] border border-white/[0.04] rounded-2xl text-center">
                    <div className="w-12 h-12 bg-white/[0.02] rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-5 h-5 text-white/20" />
                    </div>
                    <p className="text-white font-medium mb-1">No subscribers yet</p>
                    <p className="text-white/40 text-sm">When users subscribe via the blog, they'll appear here.</p>
                </div>
            ) : (
                <div className="w-full bg-[#111113] border border-white/[0.04] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[14px]">
                            <thead className="bg-white/[0.02] border-b border-white/[0.04]">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-white/50">Email Address</th>
                                    <th className="px-6 py-4 font-semibold text-white/50">Subscribed At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {subscribers.map((sub, idx) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={sub._id} 
                                        className="hover:bg-white/[0.01] transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-white/90">
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4 text-white/40">
                                            {new Date(sub.subscribedAt || sub.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric', month: 'long', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Compose Modal */}
            <AnimatePresence>
                {isDrafting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="w-full max-w-2xl bg-[#111113] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/[0.04]">
                                <h2 className="text-xl font-bold text-white">Broadcast Newsletter</h2>
                                <button
                                    onClick={() => setIsDrafting(false)}
                                    className="p-2 rounded-full hover:bg-white/[0.04] text-white/30 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleBroadcast} className="p-6 space-y-6">
                                {successMessage ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                                        <p className="text-white font-bold text-xl mb-2">Blast Sent!</p>
                                        <p className="text-white/50">{successMessage}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2 text-sm">
                                            <p className="text-white/40 font-medium">To: {subscribers.length} Subscribers</p>
                                            <div className="h-px bg-white/[0.04]" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-white/30">Newsletter Subject</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Next.js 16.2: What you need to know"
                                                value={draft.subject}
                                                onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none focus:border-primary/40 transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-white/30">Content (Markdown or HTML)</label>
                                            <textarea
                                                required
                                                placeholder="Content of your newsletter..."
                                                rows={10}
                                                value={draft.content}
                                                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none focus:border-primary/40 transition-colors resize-none font-mono"
                                            />
                                        </div>

                                        <div className="pt-2 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={sending}
                                                className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 rounded-xl text-[15px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                                                Broadcast to Everyone
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

