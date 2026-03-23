'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            aria-label="RapSora — Home"
            className={cn("group shrink-0 focus-visible:outline-none flex items-center gap-2", className)}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
                RapSora
            </span>
        </Link>
    );
}
