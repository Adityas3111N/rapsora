'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useTheme() {
    const { theme, setTheme, forcedTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return {
        theme: (forcedTheme || theme) as 'light' | 'dark' | undefined,
        setTheme,
        toggleTheme,
        mounted,
    };
}
