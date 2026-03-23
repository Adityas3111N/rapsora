'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronRight, 
    ArrowLeft, 
    TrendingUp, 
    Zap, 
    Target, 
    ShieldCheck, 
    Users,
    Sparkles,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '../../components/layout/logo';

type Step = {
    id: string;
    title: string;
    description: string;
    type: 'choice' | 'input' | 'processing' | 'result';
    options?: { label: string; value: string; icon?: React.ReactNode }[];
    placeholder?: string;
};

const STEPS: Step[] = [
    {
        id: 'revenue',
        title: 'Where is your business currently hovering?',
        description: 'Be honest. This helps us calibrate the right growth levers for your stage.',
        type: 'choice',
        options: [
            { label: 'Sub $10k / mo', value: 'seed', icon: <TrendingUp className="h-5 w-5" /> },
            { label: '$10k - $50k / mo', value: 'growth', icon: <Zap className="h-5 w-5" /> },
            { label: '$50k - $250k / mo', value: 'scale', icon: <Target className="h-5 w-5" /> },
            { label: '$250k+ / mo', value: 'elite', icon: <ShieldCheck className="h-5 w-5" /> }
        ]
    },
    {
        id: 'friction',
        title: 'What is the #1 friction point slowing your climb?',
        description: 'Identify the bottleneck that keeps you up at night.',
        type: 'choice',
        options: [
            { label: 'Traffic & Visibility', value: 'traffic', icon: <Users className="h-5 w-5" /> },
            { label: 'Converting Leads', value: 'conversion', icon: <Sparkles className="h-5 w-5" /> },
            { label: 'Operational Logistics', value: 'ops', icon: <ShieldCheck className="h-5 w-5" /> },
            { label: 'Team & Scaling', value: 'team', icon: <Users className="h-5 w-5" /> }
        ]
    },
    {
        id: 'target',
        title: "What's your 12-month 'North Star' target?",
        description: 'Dream big. We want to see the destination.',
        type: 'input',
        placeholder: 'e.g. $5M Annual Revenue'
    },
    {
        id: 'processing',
        title: 'Analyzing Your Growth Engine...',
        description: 'Our Lead Strategist is running your data against our 5X frameworks.',
        type: 'processing'
    },
    {
        id: 'result',
        title: 'Your Growth Blueprint is Ready.',
        description: 'We have identified 3 specific accelerators to hit your $5M goal.',
        type: 'result'
    }
];

export default function DiagnosticPage() {
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    const currentStep = STEPS[currentStepIdx];
    const progress = ((currentStepIdx) / (STEPS.length - 1)) * 100;

    const handleChoice = (value: string) => {
        const nextAnswers = { ...answers, [currentStep.id]: value };
        setAnswers(nextAnswers);
        
        if (currentStepIdx < STEPS.length - 1) {
            if (STEPS[currentStepIdx + 1].type === 'processing') {
                setCurrentStepIdx(currentStepIdx + 1);
                setTimeout(() => {
                    setCurrentStepIdx(currentStepIdx + 2);
                }, 3000);
            } else {
                setCurrentStepIdx(currentStepIdx + 1);
            }
        }
    };

    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const input = (e.target as any).elements[0].value;
        if (!input) return;
        handleChoice(input);
    };

    return (
        <main className="relative min-h-screen w-full bg-[#0A0A0B] text-white overflow-hidden flex flex-col items-center justify-center p-6">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
            </div>

            {/* Header */}
            <div className="absolute top-8 left-8 z-10">
                <Logo />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="relative z-10 w-full max-w-2xl"
                >
                    {/* Progress Bar */}
                    {currentStep.type !== 'result' && currentStep.type !== 'processing' && (
                        <div className="mb-12">
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" 
                                />
                            </div>
                            <p className="mt-4 text-[12px] font-bold text-white/30 uppercase tracking-[0.2em]">
                                Step {currentStepIdx + 1} of {STEPS.length - 2}
                            </p>
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="text-center mb-10">
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
                        >
                            {currentStep.title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-white/50 max-w-lg mx-auto"
                        >
                            {currentStep.description}
                        </motion.p>
                    </div>

                    {/* Choices */}
                    {currentStep.type === 'choice' && (
                        <div className="grid grid-cols-1 gap-4">
                            {currentStep.options?.map((opt, idx) => (
                                <motion.button
                                    key={opt.value}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                    onClick={() => handleChoice(opt.value)}
                                    className="group relative flex items-center gap-6 p-6 bg-white/[0.03] border border-white/10 rounded-2xl text-left hover:bg-white/[0.07] hover:border-primary/50 transition-all duration-300 active:scale-[0.98]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {opt.icon}
                                    </div>
                                    <span className="text-xl font-semibold tracking-tight">{opt.label}</span>
                                    <ChevronRight className="ml-auto h-6 w-6 text-white/20 group-hover:text-primary transition-colors" />
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    {currentStep.type === 'input' && (
                        <motion.form 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            onSubmit={handleInputSubmit}
                            className="flex flex-col items-center gap-6"
                        >
                            <input 
                                autoFocus
                                type="text"
                                placeholder={currentStep.placeholder}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-2xl font-bold text-center placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all"
                            />
                            <button 
                                type="submit"
                                className="flex items-center gap-3 px-10 py-5 bg-primary rounded-full text-lg font-bold shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] hover:scale-105 active:scale-95 transition-all"
                            >
                                Continue <ChevronRight className="h-5 w-5" />
                            </button>
                        </motion.form>
                    )}

                    {/* Processing */}
                    {currentStep.type === 'processing' && (
                        <div className="flex flex-col items-center py-12">
                            <div className="relative h-32 w-32 mb-8">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full" 
                                />
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-4 border-b-2 border-l-2 border-blue-500 rounded-full" 
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 3 }}
                                    className="h-full bg-gradient-to-r from-primary to-blue-500" 
                                />
                            </div>
                        </div>
                    )}

                    {/* Result (The Treasure) */}
                    {currentStep.type === 'result' && (
                        <div className="flex flex-col items-center">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                                className="mb-12 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
                            >
                                <ShieldCheck className="h-12 w-12" />
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="w-full space-y-4 mb-12"
                            >
                                <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl text-left flex items-start gap-5">
                                    <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">1</div>
                                    <p className="text-white/80"><span className="text-white font-bold">The Traffic Void</span>: Your current visibility metrics suggest a 62% drop-off in high-intent search traffic. We have a specific fix.</p>
                                </div>
                                <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl text-left flex items-start gap-5">
                                    <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">2</div>
                                    <p className="text-white/80"><span className="text-white font-bold">High-Friction Checkout</span>: Fixing your landing page hierarchy could recapture up to $42k in lost annual revenue immediately.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Link
                                    href="/contact"
                                    className="group relative flex flex-col items-center gap-4 px-12 py-8 bg-white text-black rounded-3xl shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:scale-[1.03] transition-all active:scale-95"
                                >
                                    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[#666]">
                                        Final Step
                                    </div>
                                    <span className="text-2xl font-black tracking-tight flex items-center gap-3">
                                        Walkthrough My Custom Blueprint <ArrowUpRight className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <Calendar className="h-5 w-5" /> 30-Min Strategy Call (100% Free)
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.button 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={() => window.location.reload()}
                                className="mt-12 text-white/30 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" /> Restart Diagnostic
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Back Button */}
            {currentStepIdx > 0 && currentStep.type !== 'result' && currentStep.type !== 'processing' && (
                <button
                    onClick={() => setCurrentStepIdx(currentStepIdx - 1)}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft className="h-4 w-4" /> Go Back
                </button>
            )}
        </main>
    );
}
