'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react';
import { GooeyCTA } from '@/components/shared/gooey-cta';
import { Magnetic } from '@/components/shared/magnetic';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactForm() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate an API call
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1920px] py-16 lg:py-32">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Left Column: Context / Alternatives */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="w-full lg:w-[35%] flex flex-col items-start gap-8"
                >
                    <p className="text-[18px] lg:text-[22px] leading-[1.6] font-medium text-foreground tracking-tight">
                        For general enquiries, please fill out the form to get in touch. Alternatively, if you know your project details — head over to our project planner for a more refined step-by-step process.
                    </p>
                    <div className="pt-2">
                        <GooeyCTA
                            className="scale-90 origin-left"
                        />
                    </div>

                    <div className="mt-8 lg:mt-16 pt-8 border-t border-foreground/10 w-full">
                        <p className="text-[14px] font-bold uppercase tracking-widest text-foreground/40 mb-2">
                            Hate contact forms?
                        </p>
                        <a
                            href="mailto:hello@rapsora.com"
                            className="text-[18px] lg:text-[22px] font-bold text-foreground hover:text-primary transition-colors tracking-tight"
                        >
                            hello@rapsora.com
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                    className="w-full lg:w-[65%]"
                >
                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="w-full space-y-6 lg:space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            required
                                            id="name"
                                            className="w-full bg-transparent border border-foreground/15 rounded-2xl px-6 py-5 text-[16px] text-foreground focus:outline-none focus:border-primary peer transition-colors"
                                            placeholder=" "
                                        />
                                        <label htmlFor="name" className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[16px] peer-focus:top-0 peer-focus:text-[12px] peer-focus:font-bold peer-focus:bg-background peer-focus:px-2 peer-focus:-translate-y-1/2 peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:-translate-y-1/2">
                                            Name
                                        </label>
                                    </div>
                                    <div className="relative group/input">
                                        <input
                                            type="email"
                                            required
                                            id="email"
                                            className="w-full bg-transparent border border-foreground/15 rounded-2xl px-6 py-5 text-[16px] text-foreground focus:outline-none focus:border-primary peer transition-colors"
                                            placeholder=" "
                                        />
                                        <label htmlFor="email" className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[16px] peer-focus:top-0 peer-focus:text-[12px] peer-focus:font-bold peer-focus:bg-background peer-focus:px-2 peer-focus:-translate-y-1/2 peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:-translate-y-1/2">
                                            Email Address
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    <div className="relative group/input">
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full bg-transparent border border-foreground/15 rounded-2xl px-6 py-5 text-[16px] text-foreground focus:outline-none focus:border-primary peer transition-colors"
                                            placeholder=" "
                                        />
                                        <label htmlFor="phone" className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[16px] peer-focus:top-0 peer-focus:text-[12px] peer-focus:font-bold peer-focus:bg-background peer-focus:px-2 peer-focus:-translate-y-1/2 peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:-translate-y-1/2">
                                            Phone (Optional)
                                        </label>
                                    </div>
                                    <div className="relative group/input">
                                        <select
                                            required
                                            defaultValue=""
                                            className="w-full bg-transparent border border-foreground/15 rounded-2xl px-5 py-5 text-[16px] text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled className="text-foreground/40 bg-background">How did you hear about Rapsora?</option>
                                            <option value="google" className="bg-background text-foreground">Google</option>
                                            <option value="social" className="bg-background text-foreground">Social Media</option>
                                            <option value="referral" className="bg-background text-foreground">Friend / Referral</option>
                                            <option value="other" className="bg-background text-foreground">Other</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative group/input h-48">
                                    <textarea
                                        required
                                        id="project"
                                        className="w-full h-full bg-transparent border border-foreground/15 rounded-2xl px-6 pt-6 pb-4 text-[16px] text-foreground focus:outline-none focus:border-primary peer transition-colors resize-none"
                                        placeholder=" "
                                    />
                                    <label htmlFor="project" className="absolute left-6 top-6 text-foreground/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-[16px] peer-focus:top-0 peer-focus:text-[12px] peer-focus:font-bold peer-focus:bg-background peer-focus:px-2 peer-focus:-translate-y-1/2 peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:font-bold peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:-translate-y-1/2">
                                        Tell us about your project
                                    </label>
                                </div>

                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative flex items-center justify-center w-6 h-6 rounded border border-foreground/20 group-hover:border-primary transition-colors">
                                        <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                                        <motion.div
                                            initial={false}
                                            className="absolute inset-0 bg-primary scale-0 rounded peer-checked:scale-100 transition-transform flex items-center justify-center text-primary-foreground"
                                        >
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </motion.div>
                                    </div>
                                    <span className="text-[15px] text-foreground/80 group-hover:text-foreground transition-colors select-none tracking-tight font-medium">
                                        Subscribe to our newsletter for all the latest Rapsora goss!
                                    </span>
                                </label>

                                <p className="text-[13px] text-foreground/50 tracking-tight">
                                    By submitting this form I accept the <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a> of this site.
                                </p>

                                <div className="pt-2">
                                    <GooeyCTA
                                        as="button"
                                        type="submit"
                                        text={submitting ? "Sending..." : "Send Message"}
                                        disabled={submitting}
                                        pillColorClass="bg-foreground"
                                        textColorClass="text-background"
                                        className="scale-90 origin-left"
                                    />
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full h-full min-h-[400px] flex flex-col items-center justify-center border border-foreground/10 rounded-3xl bg-foreground/[0.02]"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-primary" />
                                </motion.div>
                                <h3 className="text-3xl font-heading font-medium tracking-tight mb-3">Thanks for reaching out!</h3>
                                <p className="text-foreground/50 text-center max-w-sm">We've received your message and our team will get back to you within 24-48 hours.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className="w-full h-[1px] bg-foreground/10 mt-16 lg:mt-32" />
        </section>
    );
}
