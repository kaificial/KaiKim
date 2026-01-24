"use client";

import { useSpring as useReactSpring, useSpringValue, config } from '@react-spring/web';
import { springConfigs } from '@/lib/animationConfig';

/**
 * custom hooks for react spring with preset configurations
 * provides physics-based animations with natural motion
 */

/**
 * hook for smooth hover effects with spring physics
 */
export function useHoverSpring(initialScale = 1, hoverScale = 1.05) {
    const [springs, api] = useReactSpring(() => ({
        scale: initialScale,
        config: springConfigs.snappy,
    }));

    const handleMouseEnter = () => {
        api.start({ scale: hoverScale });
    };

    const handleMouseLeave = () => {
        api.start({ scale: initialScale });
    };

    return {
        springs,
        handlers: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
    };
}

/**
 * hook for magnetic cursor effect
 * element follows cursor with spring physics
 */
export function useMagneticSpring(strength = 0.3) {
    const [springs, api] = useReactSpring(() => ({
        x: 0,
        y: 0,
        config: springConfigs.magnetic,
    }));

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        api.start({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        api.start({ x: 0, y: 0 });
    };

    return {
        springs,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
        },
    };
}

/**
 * hook for bounce animation on mount
 */
export function useBounceIn(delay = 0) {
    const springs = useReactSpring({
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
        delay,
        config: springConfigs.bouncy,
    });

    return springs;
}

/**
 * hook for smooth value transitions
 */
export function useSmoothValue(targetValue: number, configName: keyof typeof springConfigs = 'gentle') {
    const value = useSpringValue(targetValue, {
        config: springConfigs[configName],
    });

    return value;
}

/**
 * hook for parallax effect with spring physics
 */
export function useParallaxSpring(scrollY: number, speed = 0.5) {
    const springs = useReactSpring({
        y: scrollY * speed,
        config: springConfigs.slow,
    });

    return springs;
}
