/**
 * centralized animation configuration system
 * provides consistent easing curves, durations, and spring physics across all animation libraries
 */

// easing curves - compatible with both framer motion and gsap
export const easings = {
    // smooth, natural easings
    smooth: [0.22, 1, 0.36, 1] as const,
    snappy: [0.4, 0, 0.2, 1] as const,
    bouncy: [0.68, -0.55, 0.265, 1.55] as const,

    // gsap-specific easing strings
    gsap: {
        smooth: 'power3.out',
        snappy: 'power2.inOut',
        elastic: 'elastic.out(1, 0.5)',
        back: 'back.out(1.7)',
    }
} as const;

// duration presets (in seconds for gsap, milliseconds for framer/spring)
export const durations = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2,
} as const;

// spring physics configurations for react-spring
export const springConfigs = {
    // gentle, smooth spring
    gentle: {
        tension: 120,
        friction: 14,
    },

    // snappy, responsive spring
    snappy: {
        tension: 300,
        friction: 20,
    },

    // bouncy, playful spring
    bouncy: {
        tension: 180,
        friction: 12,
    },

    // slow, smooth spring
    slow: {
        tension: 80,
        friction: 20,
    },

    // magnetic effect (for cursor following)
    magnetic: {
        tension: 150,
        friction: 18,
    },
} as const;

// gsap timeline defaults
export const gsapDefaults = {
    ease: easings.gsap.smooth,
    duration: durations.normal,
} as const;

// scroll trigger defaults
export const scrollTriggerDefaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false, // set to true for debugging
} as const;

// stagger configurations
export const staggerConfigs = {
    fast: {
        amount: 0.1,
        from: 'start' as const,
    },
    normal: {
        amount: 0.2,
        from: 'start' as const,
    },
    slow: {
        amount: 0.4,
        from: 'start' as const,
    },
} as const;

// animation variants for common patterns
export const variants = {
    // fade in from bottom
    fadeInUp: {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -40 },
    },

    // fade in from top
    fadeInDown: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 40 },
    },

    // scale in
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    },

    // slide in from left
    slideInLeft: {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 60 },
    },

    // slide in from right
    slideInRight: {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -60 },
    },
} as const;

// performance optimization settings
export const performanceSettings = {
    // reduce motion for users who prefer it
    respectReducedMotion: true,

    // use will-change sparingly
    useWillChange: false,

    // force hardware acceleration
    force3D: true,
} as const;
