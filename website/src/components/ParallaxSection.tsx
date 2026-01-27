"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';

/**
 * parallax section component using gsap scrolltrigger
 * creates smooth parallax scrolling effects with multiple layers
 */

interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number; // 0.5 = slower, 1.5 = faster
    className?: string;
}

export function ParallaxSection({
    children,
    speed = 0.5,
    className = '',
}: ParallaxSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // dynamically import scrolltrigger
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.to(containerRef.current, {
                y: (i, target) => {
                    const scrollDistance = ScrollTrigger.maxScroll(window);
                    return -scrollDistance * (speed - 1);
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className} style={{ willChange: 'transform' }}>
            {children}
        </div>
    );
}

/**
 * multi-layer parallax container
 * allows multiple children with different speeds
 */
interface ParallaxLayerProps {
    children: React.ReactNode;
    speed: number;
    className?: string;
    zIndex?: number;
}

export function ParallaxLayer({
    children,
    speed,
    className = '',
    zIndex = 0,
}: ParallaxLayerProps) {
    return (
        <ParallaxSection speed={speed} className={className}>
            <div style={{ position: 'relative', zIndex }}>
                {children}
            </div>
        </ParallaxSection>
    );
}
