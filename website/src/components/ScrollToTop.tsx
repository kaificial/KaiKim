"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// scrolls to top whenever the route changes
// also tracks the previous path for "back to [page]" buttons
export default function ScrollToTop() {
    const pathname = usePathname();
    const prevPathRef = useRef<string | null>(null);

    useEffect(() => {
        // Store the previous path before updating
        if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
            sessionStorage.setItem('prevPath', prevPathRef.current);
        }
        prevPathRef.current = pathname;

        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
