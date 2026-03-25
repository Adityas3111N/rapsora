'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        question: "How long does a website project usually take to complete?",
        answer: "Typically, a full premium website project takes between 6 to 12 weeks from strategy and design to development and launch. The exact timeline depends on the complexity of functionality, amount of content, and how quickly we receive feedback."
    },
    {
        question: "How much does a website cost?",
        answer: "Our minimum engagement for a complete website overhaul starts at $5,000. For complex e-commerce platforms or massive corporate architectures, the investment typically ranges between $15,000 and $30,000. We build tailored scopes based on your specific requirements."
    },
    {
        question: "We have a limited budget, will you still work with us?",
        answer: "While we can't compromise on our quality or process, we sometimes offer phased approaches. If your budget doesn't align with full agency service right now, we can launch a 'Phase 1' landing page and build out the larger architecture over time."
    },
    {
        question: "Do you outsource any work?",
        answer: "No. Everything we design and build is handcrafted by our in-house team of premium designers and developers. This ensures the Rapsora standard of quality holds true on every single pixel and line of code."
    },
    {
        question: "What services do you offer?",
        answer: "We specialize in Digital Strategy, UI/UX Design, Full-Stack Web Development, SEO (Search Engine Optimization), and Brand Identity. We are a holistic digital partner for ambitious brands."
    },
    {
        question: "What are your payment terms?",
        answer: "We typically structure payments evenly across the project timeline: 50% upfront to commence strategy and design, and 50% prior to final launch and handover."
    }
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative w-full px-4 md:px-12 py-16 lg:py-32 mx-auto max-w-[1920px]">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                
                {/* Left Column: Heading */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="w-full lg:w-1/3 sticky top-32 flex flex-col items-start"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-[14px] font-medium tracking-tight">Anything else?</span>
                    </div>

                    <h2 className="text-5xl md:text-[60px] lg:text-[75px] font-heading font-medium tracking-tight leading-[1.05] mb-8">
                        The answers to your questions.
                    </h2>

                    <a href="/diagnostic" className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-6 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                        View all FAQs 
                        <ArrowUpRight className="w-5 h-5 mx-1" />
                    </a>
                </motion.div>

                {/* Right Column: Accordion */}
                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                                className="bg-foreground/[0.03] rounded-3xl overflow-hidden"
                            >
                                <button 
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-6 lg:p-8 text-left cursor-pointer group"
                                >
                                    <span className="text-[18px] lg:text-[22px] tracking-tight font-medium text-foreground pr-8 group-hover:text-primary transition-colors">
                                        {faq.question}
                                    </span>
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-foreground text-background shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                        {isOpen ? <Minus className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0 outline-none">
                                                <p className="text-[16px] lg:text-[18px] text-foreground/70 leading-[1.6]">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
