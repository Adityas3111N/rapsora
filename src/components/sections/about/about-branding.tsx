'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function AboutBranding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative w-full h-[60vh] lg:h-[80vh] bg-black flex items-center justify-center overflow-hidden">
            {/* Split Branding Text */}
            <div className="relative flex flex-col items-center">
                <motion.h2 
                    style={{ x: xLeft }}
                    className="text-[15vw] lg:text-[12vw] font-black leading-none tracking-tighter text-white select-none translate-y-2 lg:translate-y-4"
                >
                    RAPSORA
                </motion.h2>
                <div className="w-full h-px bg-white/20 my-2 lg:my-4" />
                <motion.h2 
                    style={{ x: xRight }}
                    className="text-[15vw] lg:text-[12vw] font-black leading-none tracking-tighter text-white select-none opacity-50 -translate-y-2 lg:-translate-y-4"
                >
                    RAPSORA
                </motion.h2>
            </div>

            {/* Interactive Eye Badge (Bottom Right) */}
            <div className="absolute bottom-10 right-10 z-20">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#D4FF44] flex items-center justify-center overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                         <span className="text-[9px] lg:text-[10px] font-black text-black text-center px-4 leading-tight uppercase font-sans mb-2">
                            Explore <br/> Psychology
                        </span>
                        {/* The Eyes */}
                        <div className="flex gap-2">
                            <Eye mousePos={mousePos} />
                            <Eye mousePos={mousePos} />
                        </div>
                    </div>

                    {/* Circular Text (Rotating) */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[0.5px] border-black/10 rounded-full border-dashed"
                    />
                </motion.div>
            </div>
        </section>
    );
}

function Eye({ mousePos }: { mousePos: { x: number; y: number } }) {
    const eyeRef = useRef<HTMLDivElement>(null);
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!eyeRef.current) return;
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
        const distance = Math.min(
            6, 
            Math.sqrt(Math.pow(mousePos.x - eyeCenterX, 2) + Math.pow(mousePos.y - eyeCenterY, 2)) / 10
        );

        setPupilPos({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        });
    }, [mousePos]);

    return (
        <div ref={eyeRef} className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white border border-black/10 flex items-center justify-center relative">
            <motion.div 
                animate={{ x: pupilPos.x, y: pupilPos.y }}
                className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-black shadow-inner" 
            />
        </div>
    );
}
