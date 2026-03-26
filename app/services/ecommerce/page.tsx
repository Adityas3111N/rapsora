'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Rocket } from 'lucide-react';

export default function EcommercePage() {
    return (
        <main className="relative pt-40 pb-24 bg-background px-6 overflow-hidden">
            <div className="container mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col mb-24"
                >
                    <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-8 block">CAPABILITY REF.005</span>
                    <h1 className="text-7xl lg:text-[140px] font-black tracking-tighter text-foreground leading-[0.85] mb-12">
                        Profit <br/>
                        <span className="italic text-primary">Engines.</span>
                    </h1>
                    <p className="text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        We don't just build stores; we engineer high-velocity transactional ecosystems. We convert browsers into loyal brand advocates at scale.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {[
                        { title: 'Checkout Psychology', icon: ShoppingCart, desc: 'Streamlined transactional flows designed to trigger immediate commitment and reduce abandonment.' },
                        { title: 'Revenue Optimization', icon: CreditCard, desc: 'Strategic upsell and cross-sell protocols engineered into the core architectural logic.' },
                        { title: 'Global Scale', icon: Rocket, desc: 'High-performance e-commerce infrastructure built to handle massive traffic surges with zero friction.' }
                    ].map((item, i) => (
                        <motion.div 
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground tracking-tight">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
