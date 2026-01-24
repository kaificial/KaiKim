"use client";

import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { useGSAP as useGSAPContext } from '@gsap/react';

/**
 * custom hook for gsap animations with proper cleanup and react 19 compatibility
 * provides context-safe gsap animations with automatic cleanup on unmount
 */

interface UseGSAPOptions {
    scope?: MutableRefObject<any>;
    dependencies?: any[];
    revertOnUpdate?: boolean;
}

export function useGSAP(
    callback: (context: gsap.Context) => void | (() => void),
    options: UseGSAPOptions = {}
) {
    const { scope, dependencies = [], revertOnUpdate = false } = options;

    return useGSAPContext(callback, {
        scope,
        dependencies,
        revertOnUpdate,
    });
}

/**
 * hook for creating gsap timelines with automatic cleanup
 */
export function useGSAPTimeline(options: gsap.TimelineVars = {}) {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        timelineRef.current = gsap.timeline(options);

        return () => {
            timelineRef.current?.kill();
        };
    }, []);

    return timelineRef;
}

/**
 * hook for scroll-triggered animations
 * automatically registers scrolltrigger plugin
 */
export function useScrollTrigger() {
    useEffect(() => {
        // dynamically import scrolltrigger to avoid ssr issues
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);
        });
    }, []);

    return gsap;
}

/**
 * hook for checking if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
    const prefersReducedMotion = useRef(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion.current = mediaQuery.matches;

        const handleChange = (e: MediaQueryListEvent) => {
            prefersReducedMotion.current = e.matches;
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion.current;
}
