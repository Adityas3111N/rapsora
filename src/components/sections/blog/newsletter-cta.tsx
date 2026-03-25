'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Loader2, Check } from 'lucide-react';

export function NewsletterCTA() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            
            if (res.ok) {
                setStatus('success');
                setMsg(data.message || 'Subscribed!');
                setEmail('');
            } else {
                setStatus('error');
                setMsg(data.error || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('error');
            setMsg('Failed to connect to server.');
        }
    };

    return (
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1920px] py-16 lg:py-24 overflow-hidden">
            {/* Massive fully-rounded Container */}
            <div className="relative w-full h-[600px] lg:h-[480px] bg-primary rounded-[2.5rem] lg:rounded-[4rem] group overflow-hidden isolation-auto shadow-[0_30px_60px_-15px_rgba(144,97,249,0.3)]">
                
                {/* Background ambient gradient to add depth */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                <div className="flex flex-col lg:flex-row w-full h-full p-8 md:p-16 lg:p-24 relative z-10">
                    
                    {/* Left content block */}
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                            <span className="text-sm font-medium tracking-tight uppercase text-primary-foreground">Spam Free Newsletter</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-tight font-heading font-medium text-primary-foreground mb-10 max-w-lg">
                            Receive the most up to date insights & strategies
                        </h2>

                        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full h-[64px] rounded-full bg-background pl-8 pr-16 text-foreground text-[16px] focus:outline-none focus:ring-4 focus:ring-background/30 transition-all font-medium disabled:opacity-80 disabled:cursor-not-allowed placeholder:text-foreground/40"
                                required
                            />
                            
                            <button 
                                type="submit" 
                                disabled={status === 'loading' || status === 'success'}
                                className="absolute right-2 top-2 bottom-2 w-[48px] rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 hover:bg-foreground hover:text-background transition-all disabled:opacity-80 disabled:hover:scale-100 disabled:hover:bg-primary disabled:hover:text-primary-foreground"
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : status === 'success' ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <ArrowRight className="w-5 h-5" />
                                )}
                            </button>

                            {/* Response Messaging */}
                            {(status === 'success' || status === 'error') && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`absolute left-0 -bottom-8 text-sm font-medium ${status === 'success' ? 'text-green-200' : 'text-red-200'}`}
                                >
                                    {msg}
                                </motion.p>
                            )}
                        </form>
                    </div>

                    {/* Right decorative floating shapes area - "Tetris cutouts" like Shape */}
                    <div className="hidden lg:flex flex-1 h-full items-center justify-end relative">
                        {/* We use an interconnected custom path SVG as a floating background plate for standard web icons */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-background rounded-l-[3rem] shadow-2xl flex items-center justify-center relative translate-x-12 opacity-95">
                            {/* Inner cutouts / logos */}
                            <div className="absolute top-1/4 left-10 py-3 px-6 bg-foreground rounded-2xl flex items-center gap-3 text-background shadow-xl scale-125">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
                                <span className="font-bold text-lg tracking-tight">Vercel</span>
                            </div>

                            <div className="absolute bottom-1/4 left-24 py-3 px-6 bg-foreground rounded-2xl flex items-center gap-3 text-background shadow-xl scale-110">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                                <span className="font-bold text-lg tracking-tight">Next.js</span>
                            </div>

                            <div className="absolute top-1/2 right-12 translate-y-4 py-3 px-6 bg-background border border-foreground/10 rounded-2xl flex items-center gap-3 text-foreground shadow-xl">
                                <span className="font-black text-xl tracking-tighter">React</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
