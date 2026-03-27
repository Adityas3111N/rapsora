'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            aria-label="RapSora — Home"
            className={cn("group shrink-0 focus-visible:outline-none flex items-center", className)}
        >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-500 group-hover:scale-105">
                <img
                    src="/logo.png"
                    alt="RapSora"
                    className="h-full w-full object-contain"
                />
            </div>
        </Link>
    );
}
