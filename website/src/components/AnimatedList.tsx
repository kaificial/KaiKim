"use client";

import React, { useRef, useEffect, ElementType } from 'react';
import autoAnimate from '@formkit/auto-animate';

/**
 * animated list component using auto-animate
 * automatically animates list items when they're added, removed, or reordered
 */

interface AnimatedListProps {
    children: React.ReactNode;
    className?: string;
    duration?: number; // in milliseconds
    easing?: string;
    as?: ElementType;
}

export function AnimatedList({
    children,
    className = '',
    duration = 250,
    easing = 'ease-out',
    as: Component = 'div',
}: AnimatedListProps) {
    const parentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (parentRef.current) {
            autoAnimate(parentRef.current, {
                duration,
                easing,
            });
        }
    }, [duration, easing]);

    return (
        <Component ref={parentRef} className={className}>
            {children}
        </Component>
    );
}

/**
 * animated grid component
 * same as AnimatedList but optimized for grid layouts
 */
export function AnimatedGrid({
    children,
    className = '',
    duration = 300,
    easing = 'ease-out',
}: Omit<AnimatedListProps, 'as'>) {
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (parentRef.current) {
            autoAnimate(parentRef.current, {
                duration,
                easing,
            });
        }
    }, [duration, easing]);

    return (
        <div ref={parentRef} className={className}>
            {children}
        </div>
    );
}
