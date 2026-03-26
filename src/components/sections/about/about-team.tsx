'use client';

import { motion, useAnimation } from 'framer-motion';
import { Linkedin, Plus } from 'lucide-react';
import { GooeyCTA } from '@/components/shared/gooey-cta';
import { useState, useEffect } from 'react';

const TEAM = [
    {
        hook: 'VIRAL ARCHITECT',
        name: 'Andy',
        role: 'Co-Founder',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    },
    {
        hook: 'RETENTION SURGEON',
        name: 'Jason',
        role: 'Co-Founder',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    },
    {
        hook: 'NEURAL NARRATIVE',
        name: 'Natasia',
        role: 'Lead Architect',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    },
    {
        hook: 'GROWTH CATALYST',
        name: 'Ruby',
        role: 'Growth Lead',
        image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800',
    },
    {
        hook: 'PATTERN BREAKER',
        name: 'Joe',
        role: 'Behavioral Dev',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    }
];

// Double the team for seamless infinite scroll
const INFINITE_TEAM = [...TEAM, ...TEAM, ...TEAM];

export function AboutTeam() {
    const controls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isDragging) {
            controls.start({
                x: ["0%", "-33.33%"],
                transition: {
                    duration: 300,
                    repeat: Infinity,
                    ease: "linear"
                }
            });
        }
    }, [isDragging, controls]);

    return (
        <section id="team" className="w-full py-24 lg:py-40 bg-background overflow-hidden border-t border-black/5 dark:border-white/5">
            <div className="container mx-auto px-6">
                {/* Minimalist Header */}
                <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="px-4 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#111] mb-8"
                    >
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/60">THE ADVISORS</span>
                    </motion.div>
                    
                    <motion.h3 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl lg:text-8xl font-black text-foreground leading-[0.9] tracking-tighter"
                    >
                        Multiple personalities, <br/> 
                        <span className="text-[#9061F9] italic">Zero egos.</span>
                    </motion.h3>
                </div>
            </div>

            {/* Draggable Infinite Carousel */}
            <div className="relative w-full flex overflow-hidden py-32 lg:py-40 px-4 cursor-grab active:cursor-grabbing">
                <motion.div 
                    animate={controls}
                    drag="x"
                    dragConstraints={{ left: -5000, right: 0 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    className="flex gap-10 lg:gap-14"
                >
                    {INFINITE_TEAM.map((member, i) => (
                        <div
                            key={i}
                            className={`relative min-w-[280px] lg:min-w-[340px] aspect-[1/1.25] rounded-[24px] overflow-hidden group bg-white dark:bg-[#111] border border-black/5 dark:border-white/5
                                ${i % 2 === 0 ? 'translate-y-20' : '-translate-y-20'} shadow-[0_40px_80px_rgba(0,0,0,0.04)] hover:shadow-[0_60px_120px_rgba(144,97,249,0.1)] transition-all duration-700`}
                        >
                            {/* Portrait (No scale, high clarity) */}
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                            />
                            
                            {/* Hooky Micro-Copy (Always Visible) */}
                            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between pointer-events-none z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] lg:text-[10px] font-black bg-[#9061F9] text-white px-3 py-1 rounded-sm tracking-[0.2em] shadow-xl uppercase">
                                        {member.hook}
                                    </span>
                                    <div className="w-3 h-3 rounded-full bg-[#9061F9] shadow-[0_0_15px_rgba(144,97,249,0.6)] animate-pulse" />
                                </div>
                            </div>

                            {/* Floating Social Icons (Visible & Brand-Aligned) */}
                            <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                                <button className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-[#9061F9] flex items-center justify-center text-white hover:scale-110 transition-all pointer-events-auto shadow-xl">
                                    <Linkedin className="w-4.5 h-4.5" />
                                </button>
                                <button className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-[#9061F9] flex items-center justify-center text-white hover:scale-110 transition-all pointer-events-auto shadow-xl">
                                    <Plus className="w-4.5 h-4.5" />
                                </button>
                            </div>

                            {/* Name & Role Label (The Smaller Blob) */}
                            <div className="absolute bottom-0 left-0 bg-white dark:bg-[#111] py-4 px-8 lg:py-6 lg:px-12 rounded-tr-[32px] shadow-[10px_-10px_40px_rgba(0,0,0,0.05)] border-r border-t border-black/5 dark:border-white/5 z-20">
                                <h4 className="text-xl lg:text-2xl font-black text-foreground leading-none mb-1 whitespace-nowrap tracking-tight">
                                    {member.name}
                                </h4>
                                <p className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground/30 leading-none">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Official Brand Gooey CTA */}
            <div className="container mx-auto px-6 mt-4 lg:mt-8 flex justify-center pb-12 lg:pb-16">
                <GooeyCTA 
                    href="/diagnostic"
                    text="Join the Lab"
                    pillColorClass="bg-[#9061F9]"
                    textColorClass="text-white"
                />
            </div>
        </section>
    );
}
