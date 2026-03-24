'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
    const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: fine)');
        if (!mediaQuery.matches) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
            setIsHovering(!!interactive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (typeof window === 'undefined') return null;

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
            style={{ x: springX, y: springY }}
        >
            {/* Outer circle */}
            <motion.div
                animate={{
                    width: isHovering ? 56 : 10,
                    height: isHovering ? 56 : 10,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
                {/* Arrow icon — only visible when expanded */}
                <motion.div
                    animate={{
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
