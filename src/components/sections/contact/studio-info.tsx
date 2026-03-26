'use client';

import { motion } from 'framer-motion';
import { Magnetic } from '@/components/shared/magnetic';
import { ArrowUpRight, MapPin, Linkedin, Twitter, Github, Instagram, Dribbble } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function StudioInfo() {
    return (
        <section className="relative w-full px-4 md:px-12 py-16 lg:py-32 mx-auto max-w-[1920px]">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="w-full bg-foreground/[0.03] rounded-[2.5rem] lg:rounded-[3.5rem] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-16 lg:gap-24"
            >
                {/* Left Column: Info */}
                <div className="w-full lg:w-[45%] flex flex-col pr-0 lg:pr-8 shrink-0 relative z-10">
                    <h2 className="text-5xl lg:text-[70px] xl:text-[85px] font-heading font-medium tracking-tight text-foreground leading-[1.05] mb-8">
                        Our Kanpur<br/>Workspace
                    </h2>
                    <p className="text-[17px] lg:text-[19px] leading-[1.6] text-foreground/80 font-medium max-w-lg mb-12">
                        Located right in the heart of the city in Chhuniganj, Kanpur. Our workspace is extremely accessible and just a short 100-meter walk from the nearest metro station.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 mb-16">
                        {/* Address */}
                        <div className="flex flex-col gap-3">
                            <p className="text-[14px] text-foreground/50 mb-2 tracking-tight">Studio Address</p>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-foreground/60 shrink-0 mt-0.5" />
                                <div className="text-[16px] xl:text-[18px] text-foreground font-medium leading-[1.5]">
                                    <p className="font-bold mb-1 tracking-tight">Rapsora Agency</p>
                                    <p>Chhuniganj Area</p>
                                    <p>Kanpur, UP</p>
                                    <p>100m from Metro</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col gap-4">
                            <p className="text-[14px] text-foreground/50 mb-1 tracking-tight">Follow us</p>
                            <div className="flex gap-3 flex-wrap max-w-[200px]">
                                {[
                                    { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-[#0077b5] hover:text-white', link: 'https://linkedin.com' },
                                    { name: 'Twitter', icon: Twitter, color: 'hover:bg-black hover:text-white', link: 'https://twitter.com' },
                                    { name: 'Github', icon: Github, color: 'hover:bg-[#333] hover:text-white', link: 'https://github.com' },
                                    { name: 'Instagram', icon: Instagram, color: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white', link: 'https://instagram.com' },
                                    { name: 'Dribbble', icon: Dribbble, color: 'hover:bg-[#EA4C89] hover:text-white', link: 'https://dribbble.com' }
                                ].map((social) => (
                                    <Magnetic key={social.name}>
                                        <a 
                                            href={social.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            title={social.name}
                                            data-cursor-ignore
                                            className={`w-11 h-11 rounded-full bg-primary/20 text-primary flex items-center justify-center transition-colors duration-300 ${social.color}`}
                                        >
                                            <social.icon className="w-4 h-4" />
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <Magnetic>
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=Chunni+Ganj+Kanpur" 
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center justify-between h-[60px] pl-8 pr-2 w-[220px] rounded-full bg-foreground text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                            >
                                <span className="font-bold text-[15px]">Get directions</span>
                                <div className="w-12 h-12 rounded-full bg-background/10 text-background group-hover:bg-primary-foreground group-hover:text-primary flex items-center justify-center transition-colors shrink-0">
                                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                                </div>
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className="w-full lg:flex-1 h-[400px] lg:h-auto overflow-hidden rounded-[2rem] lg:rounded-[3rem] relative bg-foreground/5">
                    <img 
                        src="/images/rapsora_workspace.png" 
                        alt="Rapsora Studio Workspace" 
                        className="w-full h-full object-cover origin-center transition-transform hover:scale-105 duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    {/* Simulated neon sign glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
            </motion.div>
        </section>
    );
}
