// easing curves - compatible with both framer motion and gsap
export const easings = {
    smooth: [0.22, 1, 0.36, 1] as const,
    snappy: [0.4, 0, 0.2, 1] as const,
    bouncy: [0.68, -0.55, 0.265, 1.55] as const,

    gsap: {
        smooth: 'power3.out',
        snappy: 'power2.inOut',
        elastic: 'elastic.out(1, 0.5)',
        back: 'back.out(1.7)',
    }
} as const;

// duration presets (in seconds for gsap)
export const durations = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2,
} as const;

export const gsapDefaults = {
    ease: easings.gsap.smooth,
    duration: durations.normal,
} as const;

export const scrollTriggerDefaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false,
} as const;

export const staggerConfigs = {
    fast: { amount: 0.1, from: 'start' as const },
    normal: { amount: 0.2, from: 'start' as const },
    slow: { amount: 0.4, from: 'start' as const },
} as const;

export const variants = {
    fadeInUp: {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -40 },
    },
    fadeInDown: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 40 },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    },
    slideInLeft: {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 60 },
    },
    slideInRight: {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -60 },
    },
} as const;
