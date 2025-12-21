"use client";


import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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

    return (
        <div className="w-full">
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
                            transition={{ delay: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Kai Kim
                        </motion.h1>

                        <motion.div
                            className="hero-subtitle-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
                            transition={{ delay: 1.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        >
                            I enjoy designing and building reliable software. From algorithms to full stack solutions, I love exploring new technologies that push my skills forward!
                        </motion.p>

                        {/* social icon links */}
                        <motion.div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* GitHub */}
                            <motion.a
                                href="https://github.com/kaificial"
                                target="_blank"
                                rel="noopener noreferrer"
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
                                whileHover={{ backgroundColor: iconColors.bgHover, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="GitHub"
                                onMouseEnter={() => setHoveredIcon('hero-github')}
                                onMouseLeave={() => setHoveredIcon(null)}
                            >
                                <AnimatePresence>
                                    {hoveredIcon === 'hero-github' && <Tooltip text="GitHub" />}
                                </AnimatePresence>
                                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </motion.a>

                            {/* LinkedIn */}
                            <motion.a
                                href="https://www.linkedin.com/in/newjeans/"
                                target="_blank"
                                rel="noopener noreferrer"
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
                                whileHover={{ backgroundColor: iconColors.bgHover, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="LinkedIn"
                                onMouseEnter={() => setHoveredIcon('hero-linkedin')}
                                onMouseLeave={() => setHoveredIcon(null)}
                            >
                                <AnimatePresence>
                                    {hoveredIcon === 'hero-linkedin' && <Tooltip text="LinkedIn" />}
                                </AnimatePresence>
                                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </motion.a>

                            {/* Email */}
                            <motion.a
                                href="mailto:kaifieldkim@gmail.com"
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
                                whileHover={{ backgroundColor: iconColors.bgHover, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Email"
                                onMouseEnter={() => setHoveredIcon('hero-email')}
                                onMouseLeave={() => setHoveredIcon(null)}
                            >
                                <AnimatePresence>
                                    {hoveredIcon === 'hero-email' && <Tooltip text="Email" />}
                                </AnimatePresence>
                                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </motion.a>

                            {/* Resume */}
                            <motion.a
                                href="/resume"
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
                                whileHover={{ backgroundColor: iconColors.bgHover, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Resume"
                                onMouseEnter={() => setHoveredIcon('hero-resume')}
                                onMouseLeave={() => setHoveredIcon(null)}
                            >
                                <AnimatePresence>
                                    {hoveredIcon === 'hero-resume' && <Tooltip text="Resume" />}
                                </AnimatePresence>
                                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ delay: 1.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ delay: 1.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ delay: 1.6, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Skills
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Languages */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Languages</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['JavaScript', 'TypeScript', 'HTML/CSS', 'Python', 'Java', 'Arduino'].map((skill, index) => (
                                <motion.span
                                    key={index}
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
                        </div>
                    </div>

                    {/* Frontend */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Frontend</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['React', 'Next.js', 'Tailwind CSS'].map((skill, index) => (
                                <motion.span
                                    key={index}
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
                        </div>
                    </div>

                    {/* Backend */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Backend</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['Node.js', 'Express.js', 'MongoDB'].map((skill, index) => (
                                <motion.span
                                    key={index}
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
                        </div>
                    </div>

                    {/* Tools & Others */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Tools & Others</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['Git', 'REST APIs', 'VS Code', 'Canva'].map((skill, index) => (
                                <motion.span
                                    key={index}
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
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Featured Projects Section */}
            <motion.section
                style={{ marginTop: '48px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
                    {[
                        {
                            id: 'ratemyeats',
                            title: 'RateMyEats',
                            description: 'University dining hall rating platform for Canadian students',
                            tags: ['React', 'Node.js', 'MongoDB'],
                            status: 'Building',
                            url: 'ratemyeats.com',
                            video: null,
                            solidColor: '#262626'
                        },
                        {
                            id: 'rooke',
                            title: 'Rooke',
                            description: 'A chess app Made for new chess players looking to improve their skills.',
                            tags: ['React Native', 'TypeScript', 'Chess'],
                            status: 'Live',
                            url: 'rooke.gg',
                            icon: '♜',
                            video: '/assets/Rooke.mp4'
                        },
                        {
                            id: 'scribe',
                            title: 'Scribe',
                            description: 'Convert handwritten math into polished LaTeX in seconds, without writing a single backslash.',
                            tags: ['React', 'AI', 'LaTeX'],
                            status: 'Building',
                            url: 'scribe.ai',
                            video: '/assets/ScribeAI.mp4'
                        }
                    ].map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ scale: 0.99 }}
                            whileInView={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                borderRadius: '12px',
                                padding: '24px',
                                backgroundColor: isDark ? '#0a0a0a' : 'white'
                            }}>
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
                                            href="#"
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
                        </motion.div>
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
            < div style={{ height: '96px' }}></div >
            <motion.div
                initial={{ opacity: 0, x: '-50%' }}
                animate={{ opacity: 1, x: '-50%' }}
                transition={{ duration: 1.0, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '50%',
                    backgroundColor: isDark ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
                    padding: '6px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
                    zIndex: 1000
                }}
            >

                <motion.div
                    onMouseEnter={() => setHoveredIcon('home')}
                    onMouseLeave={() => setHoveredIcon(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: 'relative',
                        backgroundColor: isDark ? '#374151' : 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px', // Sharper corners
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
                        color: isDark ? 'white' : 'black',
                        cursor: 'default'
                    }}>
                    <AnimatePresence>
                        {hoveredIcon === 'home' && <Tooltip text="Home" />}
                    </AnimatePresence>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </motion.div>


                <motion.div
                    onMouseEnter={() => setHoveredIcon('projects')}
                    onMouseLeave={() => setHoveredIcon(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'relative' }}
                >
                    <AnimatePresence>
                        {hoveredIcon === 'projects' && <Tooltip text="Projects" />}
                    </AnimatePresence>
                    <Link href="/projects" style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        transition: 'color 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.color = isDark ? 'white' : 'black'}
                        onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <polyline points="9 10 11 12 9 14"></polyline>
                            <line x1="13" y1="14" x2="17" y2="14"></line>
                        </svg>
                    </Link>
                </motion.div>

                <div style={{ width: '1px', height: '20px', backgroundColor: isDark ? '#4b5563' : '#d1d5db', margin: '0 4px' }}></div>


                <div style={{ display: 'flex', gap: '4px' }}>

                    <motion.a
                        onMouseEnter={() => setHoveredIcon('github')}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/kaificial"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                        <AnimatePresence>
                            {hoveredIcon === 'github' && <Tooltip text="GitHub" />}
                        </AnimatePresence>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </motion.a>

                    <motion.a
                        onMouseEnter={() => setHoveredIcon('linkedin')}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                        <AnimatePresence>
                            {hoveredIcon === 'linkedin' && <Tooltip text="LinkedIn" />}
                        </AnimatePresence>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </motion.a>

                    <motion.a
                        onMouseEnter={() => setHoveredIcon('resume')}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="/resume"
                        style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                        <AnimatePresence>
                            {hoveredIcon === 'resume' && <Tooltip text="Resume" />}
                        </AnimatePresence>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </motion.a>

                    <motion.a
                        onMouseEnter={() => setHoveredIcon('contact')}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="mailto:kaifieldkim@gmail.com"
                        style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                        <AnimatePresence>
                            {hoveredIcon === 'contact' && <Tooltip text="Email" />}
                        </AnimatePresence>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </motion.a>
                </div>


                <div style={{ width: '1px', height: '20px', backgroundColor: isDark ? '#4b5563' : '#d1d5db', margin: '0 4px' }}></div>


                <motion.div
                    onMouseEnter={() => setHoveredIcon('spotify')}
                    onMouseLeave={() => setHoveredIcon(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
                >
                    <AnimatePresence>
                        {hoveredIcon === 'spotify' && <Tooltip text="Spotify" />}
                    </AnimatePresence>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 14.82 1.14.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.439.3z" /></svg>
                </motion.div>

                <motion.button
                    onMouseEnter={() => setHoveredIcon('theme')}
                    onMouseLeave={() => setHoveredIcon(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    style={{
                        position: 'relative',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <AnimatePresence>
                        {hoveredIcon === 'theme' && <Tooltip text={isDark ? "Light Mode" : "Dark Mode"} />}
                    </AnimatePresence>
                    {isDark ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    )}
                </motion.button>
            </motion.div>
        </div>
    );
}

