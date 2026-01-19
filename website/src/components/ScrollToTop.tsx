"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// scrolls to top whenever the route changes
export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
