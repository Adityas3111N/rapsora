'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

interface SiteLayoutProps {
    children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
    const pathname = usePathname();
    const isDiagnostic = pathname?.startsWith('/diagnostic');

    return (
        <div className="flex min-h-screen flex-col">
            {!isDiagnostic && <Header />}
            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
            >
                {children}
            </motion.main>
            {!isDiagnostic && <Footer />}
        </div>
    );
}
