"use client";


import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import { SpotlightCard } from '../components/SpotlightCard';
import { projects } from '../data/projects';
import FloatingDock from '../components/FloatingDock';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function HomePage() {
    const { isDark, toggleTheme } = useTheme();
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const Tooltip = ({ text }: { text: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%' }}
            transition={{ duration: 0.15 }}
            style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                marginBottom: '12px',
                padding: '6px 12px',
                backgroundColor: isDark ? '#1f2937' : 'white',
                color: isDark ? 'white' : 'black',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                pointerEvents: 'none',
                zIndex: 50,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            }}
        >
            {text}
            <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                marginLeft: '-4px',
                width: '8px',
                height: '8px',
                backgroundColor: 'inherit',
                borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                transform: 'rotate(45deg)'
            }} />
        </motion.div>
    );
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [isTorontoHovered, setIsTorontoHovered] = useState(false);
    const [isHeroImageHovered, setIsHeroImageHovered] = useState(false);

    const toggleExpand = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };


    const iconColors = {
        bg: isDark ? '#121212' : '#f5f5f4',
        bgHover: isDark ? '#2a2a2a' : '#ffffff',
        icon: isDark ? 'white' : '#1c1917',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        shadow: isDark ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.04)'
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="w-full">
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#2563eb', // Matches "View All Projects" button
                    transformOrigin: '0%',
                    zIndex: 9999
                }}
            />
            {/* 
                Hero Section
            */}
            <section className="hero-section">
                <div className="hero-layout">
                    {/* Left Column - Hero Text */}
                    <div className="hero-content" style={{ position: 'relative', zIndex: 10 }}>
                        {/* name and title */}
                        <motion.h1
                            className="hero-title font-bold text-gray-900 dark:text-white tracking-tight leading-none text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Kai Kim
                        </motion.h1>

                        <motion.div
                            className="hero-subtitle-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="hero-subtitle text-gray-900 dark:text-gray-100 font-medium m-0">
                                CS @ Queen's
                            </span>
                            <motion.div
                                className="location-pill"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ position: 'relative', cursor: 'pointer' }}
                                onMouseEnter={() => setIsTorontoHovered(true)}
                                onMouseLeave={() => setIsTorontoHovered(false)}
                            >
                                <AnimatePresence>
                                    {isTorontoHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                bottom: '120%',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '180px',
                                                height: '110px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                                zIndex: 50,
                                                pointerEvents: 'none',
                                                background: isDark ? '#1f2937' : 'white'
                                            }}
                                        >
                                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                <Image
                                                    src="/assets/toto.png"
                                                    alt="Toronto Skyline"
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Toronto, ON
                            </motion.div>
                        </motion.div>

                        <motion.p
                            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl text-left"
                            style={{ marginBottom: '20px' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            I enjoy designing and building reliable software. From algorithms to full stack solutions, I love exploring new technologies that push my skills forward!
                        </motion.p>

                        {/* social icon links */}
                        <motion.div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        delayChildren: 1.5,
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {[
                                {
                                    id: 'hero-github',
                                    href: "https://github.com/kaificial",
                                    label: 'GitHub',
                                    icon: <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                },
                                {
                                    id: 'hero-linkedin',
                                    href: "https://www.linkedin.com/in/newjeans/",
                                    label: 'LinkedIn',
                                    icon: <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                },
                                {
                                    id: 'hero-email',
                                    href: "mailto:kaikimto@gmail.com",
                                    label: 'Mail: kaikimto@gmail.com',
                                    icon: <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                },
                                {
                                    id: 'hero-resume',
                                    href: "/resume",
                                    label: 'Resume',
                                    icon: <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                }
                            ].map((social) => (
                                <motion.a
                                    key={social.id}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? "_blank" : undefined}
                                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    style={{
                                        position: 'relative',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: iconColors.bg,
                                        color: iconColors.icon,
                                        borderRadius: '8px',
                                        border: iconColors.border,
                                        boxShadow: iconColors.shadow
                                    }}
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{ backgroundColor: iconColors.bgHover, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                    onMouseEnter={() => setHoveredIcon(social.id)}
                                    onMouseLeave={() => setHoveredIcon(null)}
                                >
                                    <AnimatePresence>
                                        {hoveredIcon === social.id && <Tooltip text={social.label} />}
                                    </AnimatePresence>
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.65, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div
                            className="image-placeholder"
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setIsHeroImageHovered(true)}
                            onMouseLeave={() => setIsHeroImageHovered(false)}
                        >
                            <AnimatePresence>
                                {isHeroImageHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
                                        animate={{ opacity: 1, scale: 1, rotate: -15 }}
                                        exit={{ opacity: 0, scale: 0.8, rotate: -25 }}
                                        transition={{ duration: 0.2, ease: "backOut" }}
                                        style={{
                                            position: 'absolute',
                                            top: '-15px',
                                            left: '-15px',
                                            backgroundColor: isDark ? '#1f2937' : 'white',
                                            color: isDark ? 'white' : '#1f2937',
                                            padding: '6px 14px',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                            zIndex: 20,
                                            pointerEvents: 'none',
                                            whiteSpace: 'nowrap',
                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                                        }}
                                    >
                                        Hello!
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-6px',
                                            right: '12px',
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: isDark ? '#1f2937' : 'white',
                                            transform: 'rotate(45deg)',
                                            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                                            borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                                        }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Image
                                src="/assets/latte2.jpg"
                                alt="Kai Kim"
                                width={160}
                                height={160}
                                className="hero-image"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Experience Section */}
            <motion.section
                style={{ marginTop: '24px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Experience
                </h2>

                {/* Experience Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {/* QMIND */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* QMIND Logo */}
                                <div style={{ width: '64px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/QMIND_logo.png"
                                        alt="QMIND Logo"
                                        width={44}
                                        height={44}
                                        style={{
                                            borderRadius: '8px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        marginBottom: '0px',
                                        color: isDark ? 'white' : '#1c1917'
                                    }}>
                                        QMIND
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: isDark ? '#9ca3af' : '#6b7280'
                                    }}>
                                        AI/ML Team Member
                                    </p>
                                </div>
                            </div>

                            <span style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Oct. 2025 - Present
                            </span>
                        </div>

                        <motion.button
                            onClick={() => toggleExpand('qmind')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                color: isDark ? '#BFDBFE' : '#1E40AF',
                                borderColor: isDark ? '#1D4ED8' : '#BFDBFE'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(31, 41, 55, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                padding: '5px 12px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '68px' // Align with text
                            }}
                        >
                            {expandedItems['qmind'] ? 'Show less' : 'Read more'}
                            <motion.svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ rotate: expandedItems['qmind'] ? 180 : 0 }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                            {expandedItems['qmind'] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ marginLeft: '68px', marginTop: '4px', paddingBottom: '12px' }}>
                                        <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                                            Working on machine learning and artificial intelligence projects
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '4px', margin: '-4px' }}>
                                            {['Python', 'Machine Learning', 'Neural Networks', 'TensorFlow'].map((skill, index) => (
                                                <motion.span
                                                    key={index}
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        display: 'inline-block',
                                                        cursor: 'default',
                                                        padding: '4px 12px',
                                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`,
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* QAC */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* QAC Logo */}
                                <div style={{ width: '64px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/QAC_LOGO_CROP.png"
                                        alt="QAC Logo"
                                        width={56}
                                        height={56}
                                        style={{
                                            borderRadius: '8px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: '-4px' }}>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        marginBottom: '0px',
                                        color: isDark ? 'white' : '#1c1917'
                                    }}>
                                        QAC (Queen's Actuarial-Science Club)
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: isDark ? '#9ca3af' : '#6b7280'
                                    }}>
                                        Web Developer
                                    </p>
                                </div>
                            </div>

                            <span style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Oct. 2025 - Present
                            </span>
                        </div>

                        <motion.button
                            onClick={() => toggleExpand('qac')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                color: isDark ? '#BFDBFE' : '#1E40AF',
                                borderColor: isDark ? '#1D4ED8' : '#BFDBFE'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(31, 41, 55, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                padding: '5px 12px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '68px' // Align with text
                            }}
                        >
                            {expandedItems['qac'] ? 'Show less' : 'Read more'}
                            <motion.svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ rotate: expandedItems['qac'] ? 180 : 0 }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                            {expandedItems['qac'] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ marginLeft: '68px', marginTop: '4px', paddingBottom: '12px' }}>
                                        <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                                            Developing and maintaining the club's website and digital presence
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '4px', margin: '-4px' }}>
                                            {['React', 'Next.js', 'TypeScript', 'Web Design'].map((skill, index) => (
                                                <motion.span
                                                    key={index}
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        display: 'inline-block',
                                                        cursor: 'default',
                                                        padding: '4px 12px',
                                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`,
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* QBiT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* QBiT Logo */}
                                <div style={{ width: '64px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/QBiT_Logo-1.png"
                                        alt="QBiT Logo"
                                        width={56}
                                        height={56}
                                        style={{
                                            borderRadius: '8px',
                                            objectFit: 'cover',
                                            filter: isDark ? 'invert(1)' : 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        marginBottom: '0px',
                                        color: isDark ? 'white' : '#1c1917'
                                    }}>
                                        QBiT (Queen's Biomedical Innovation Team)
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: isDark ? '#9ca3af' : '#6b7280'
                                    }}>
                                        Software Engineer
                                    </p>
                                </div>
                            </div>

                            <span style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Sept. 2025 - Present
                            </span>
                        </div>

                        <motion.button
                            onClick={() => toggleExpand('qbit')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                color: isDark ? '#BFDBFE' : '#1E40AF',
                                borderColor: isDark ? '#1D4ED8' : '#BFDBFE'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(31, 41, 55, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                padding: '5px 12px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '68px', // Align with text
                                marginTop: '-16px'
                            }}
                        >
                            {expandedItems['qbit'] ? 'Show less' : 'Read more'}
                            <motion.svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ rotate: expandedItems['qbit'] ? 180 : 0 }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                            {expandedItems['qbit'] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ marginLeft: '68px', marginTop: '4px' }}>
                                        <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                                            Building software solutions for biomedical innovation projects
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {['C++', 'Python', 'Medical Imaging', 'Git'].map((skill, index) => (
                                                <motion.span
                                                    key={index}
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        display: 'inline-block',
                                                        cursor: 'default',
                                                        padding: '4px 12px',
                                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`,
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div >
                </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
                style={{ marginTop: '48px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.95, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Education
                </h2>

                <div style={{
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image
                            src="/assets/queens.png"
                            alt="Queen's University Logo"
                            width={48}
                            height={48}
                            style={{
                                objectFit: 'contain',
                                filter: 'none'
                            }}
                        />
                        <div>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0px',
                                color: isDark ? 'white' : '#1c1917'
                            }}>
                                Queen's University
                            </h3>
                            <p style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280'
                            }}>
                                Bachelor of Computing
                            </p>
                        </div>
                    </div>

                    <span style={{
                        fontSize: '0.8125rem',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        fontWeight: '500'
                    }}>
                        2029
                    </span>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                style={{ marginTop: '48px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Skills
                </h2>

                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {/* Languages */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Languages</h3>
                        <motion.div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {['JavaScript', 'TypeScript', 'HTML/CSS', 'Python', 'Java', 'Arduino'].map((skill, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'inline-block',
                                        cursor: 'default',
                                        padding: '6px 16px',
                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Frontend */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Frontend</h3>
                        <motion.div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {['React', 'Next.js', 'Tailwind CSS'].map((skill, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'inline-block',
                                        cursor: 'default',
                                        padding: '6px 16px',
                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Backend */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Backend</h3>
                        <motion.div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {['Node.js', 'Express.js', 'MongoDB'].map((skill, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'inline-block',
                                        cursor: 'default',
                                        padding: '6px 16px',
                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Tools & Others */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Tools & Others</h3>
                        <motion.div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {['Git', 'REST APIs', 'VS Code', 'Canva'].map((skill, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'inline-block',
                                        cursor: 'default',
                                        padding: '6px 16px',
                                        backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                        color: isDark ? '#BFDBFE' : '#1E40AF',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Featured Projects Section */}
            <motion.section
                style={{ marginTop: '48px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.25, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Featured Projects
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {projects.map((project) => (
                        <SpotlightCard key={project.id} isDark={isDark}>
                            {/* Browser Window Mockup */}
                            <div style={{
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                marginBottom: '24px'
                            }}>
                                {/* Browser Header */}
                                <div style={{
                                    backgroundColor: '#1f2937', // dark slate
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    {/* Address Bar */}
                                    <div style={{
                                        flex: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '4px',
                                        padding: '4px 12px',
                                        fontSize: '0.75rem',
                                        color: '#9ca3af',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        {project.url}
                                    </div>
                                    {/* Window Controls */}
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6b7280' }}></div>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6b7280' }}></div>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6b7280' }}></div>
                                    </div>
                                </div>

                                {/* Browser Body / Preview Area */}
                                <div style={{
                                    height: '400px',
                                    backgroundColor: (project as any).solidColor || (isDark ? '#171717' : '#f3f4f6'),
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#9ca3af',
                                    position: 'relative'
                                }}>
                                    {project.video ? (
                                        <video
                                            src={project.video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        !(project as any).solidColor && (
                                            <>
                                                <span style={{ fontSize: '2rem', marginBottom: '8px' }}>{project.icon}</span>
                                                <p style={{ fontWeight: '500' }}>{project.title}</p>
                                                <p style={{ fontSize: '0.875rem' }}>Screenshot Preview</p>
                                            </>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div>
                                <h3 style={{
                                    fontSize: '1.375rem',
                                    fontWeight: 'bold',
                                    color: isDark ? 'white' : '#1c1917',
                                    marginBottom: '8px'
                                }}>
                                    {project.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: isDark ? '#9ca3af' : '#6b7280',
                                    marginBottom: '16px'
                                }}>
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                                    {project.tags.map((tech, i) => (
                                        <motion.span
                                            key={i}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                display: 'inline-block',
                                                cursor: 'default',
                                                padding: '4px 12px',
                                                borderRadius: '9999px',
                                                backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                                color: isDark ? '#BFDBFE' : '#1E40AF',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                            }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Footer: Status & Buttons */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: project.status === 'Live' ? '#22c55e' : '#eab308' // Green if Live, Yellow if Building
                                        }}></div>
                                        <span style={{ color: isDark ? '#d1d5db' : '#4b5563', fontSize: '0.875rem' }}>{project.status}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <motion.a
                                            href="#"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: '#2563eb',
                                                color: 'white',
                                                borderRadius: '6px',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            Live Demo
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </motion.a>
                                        <motion.a
                                            href={project.github || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                                                color: isDark ? 'white' : '#1f2937',
                                                borderRadius: '6px',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            GitHub
                                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                <div style={{ marginTop: '16px', textAlign: 'left' }}>
                    <Link href="/projects" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: 'white',
                        textDecoration: 'none',
                        backgroundColor: '#2563eb',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        transition: 'opacity 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        View All Projects
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </motion.section>

            {/* Blank Footer Space */}
            <div style={{ height: '96px' }} />
            <FloatingDock />
        </div>
    );
}

