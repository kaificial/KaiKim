"use client";


import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import { SpotlightCard } from '../components/SpotlightCard';
import { projects } from '../data/projects';
import FloatingDock from '../components/FloatingDock';
import { ProjectDescription } from '../components/ProjectDescription';
import Webring from '../components/Webring';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ProjectVideo } from '../components/ProjectVideo';

// Helper to get logo URL
const getSkillLogo = (skill: string, isDark: boolean) => {
    const slugMap: Record<string, string> = {
        'JavaScript': 'javascript',
        'TypeScript': 'typescript',
        'HTML/CSS': 'html5',
        'Python': 'python',
        'Java': 'java',
        'Arduino': 'arduino',
        'React': 'react',
        'Next.js': 'nextdotjs',
        'Tailwind CSS': 'tailwindcss',
        'Node.js': 'nodedotjs',
        'Express.js': 'express',
        'MongoDB': 'mongodb',
        'Git': 'git',
        'VS Code': 'visualstudiocode',
        'Canva': 'canva',
        'Figma': 'figma',
        'REST APIs': 'fastapi' // Placeholder/approximate
    };

    const slug = slugMap[skill];
    const color = isDark ? 'E5E7EB' : '111827';

    if (!slug) return null;
    return `https://cdn.simpleicons.org/${slug}/${color}`;
};

const ProjectTitle = ({ project, isDark }: { project: any, isDark: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    if (project.id !== 'portfolio') {
        return (
            <h3 style={{
                fontSize: '1.375rem',
                fontWeight: 'bold',
                color: isDark ? 'white' : '#1c1917',
                margin: 0
            }}>
                {project.title}
            </h3>
        );
    }

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                fontSize: '1.375rem',
                fontWeight: 'bold',
                color: isDark ? 'white' : '#1c1917',
                margin: 0,
                cursor: 'default',
                height: '1.6em', // consistent height to prevent jumps
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <AnimatePresence mode="wait">
                {isHovered ? (
                    <motion.span
                        key="dejavu"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: '#3b82f6' }} // blue highlight for the effect
                    >
                        DeJa Vu?
                    </motion.span>
                ) : (
                    <motion.span
                        key="title"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {project.title}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Home() {
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
                                },
                                {
                                    id: 'hero-x',
                                    href: "https://x.com/kaijinju",
                                    label: 'X',
                                    icon: <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
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
                                        borderRadius: '10px',
                                        border: iconColors.border,
                                        boxShadow: isDark
                                            ? '0 1px 2px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                                            : '0 1px 2px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)'
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* QMIND */}
                    <div className="experience-item" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="experience-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* QMIND Logo */}
                                <div className="experience-logo-container" style={{ width: '48px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/QMIND_logo.png"
                                        alt="QMIND Logo"
                                        width={36}
                                        height={36}
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

                            <span className="experience-date" style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Oct. 2025 - Present
                            </span>
                        </div>

                        <motion.button
                            className="experience-btn"
                            onClick={() => toggleExpand('qmind')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.9)' : '#E5E7EB',
                                color: isDark ? '#E5E7EB' : '#111827',
                                borderColor: isDark ? '#374151' : '#D1D5DB'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '52px',
                                marginTop: '4px'
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
                                    <div style={{ marginLeft: '52px', marginTop: '0px', paddingBottom: '12px' }}>
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
                                                        backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                                        color: isDark ? '#E5E7EB' : '#111827',
                                                        border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`,
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
                    <div className="experience-item" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="experience-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* QAC Logo */}
                                <div className="experience-logo-container" style={{ width: '48px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/QAC_LOGO_CROP.png"
                                        alt="QAC Logo"
                                        width={36}
                                        height={36}
                                        style={{
                                            borderRadius: '8px',
                                            objectFit: 'contain'
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

                            <span className="experience-date" style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Oct. 2025 - Present
                            </span>
                        </div>

                        <motion.button
                            className="experience-btn"
                            onClick={() => toggleExpand('qac')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.9)' : '#E5E7EB',
                                color: isDark ? '#E5E7EB' : '#111827',
                                borderColor: isDark ? '#374151' : '#D1D5DB'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '52px',
                                marginTop: '4px'
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
                                    <div style={{ marginLeft: '52px', marginTop: '0px', paddingBottom: '12px' }}>
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
                                                        backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                                        color: isDark ? '#E5E7EB' : '#111827',
                                                        border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`,
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
                    <div className="experience-item" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="experience-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* QBiT Logo */}
                                <div className="experience-logo-container" style={{ width: '48px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/QBiT_Logo-1.png"
                                        alt="QBiT Logo"
                                        width={36}
                                        height={36}
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

                            <span className="experience-date" style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Sept. 2025 - Present
                            </span>
                        </div>

                        <motion.button
                            className="experience-btn"
                            onClick={() => toggleExpand('qbit')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.9)' : '#E5E7EB',
                                color: isDark ? '#E5E7EB' : '#111827',
                                borderColor: isDark ? '#374151' : '#D1D5DB'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '52px'
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
                                    <div style={{ marginLeft: '52px', marginTop: '4px' }}>
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
                                                        backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                                        color: isDark ? '#E5E7EB' : '#111827',
                                                        border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`,
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

                    {/* RenoRun */}
                    <div className="experience-item" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="experience-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                                {/* RenoRun Logo */}
                                <div className="experience-logo-container" style={{ width: '48px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                                    <Image
                                        src="/assets/Reno Run.png"
                                        alt="RenoRun Logo"
                                        width={36}
                                        height={36}
                                        style={{
                                            borderRadius: '8px',
                                            objectFit: 'cover',
                                            filter: isDark ? 'grayscale(1) brightness(1.2)' : 'grayscale(1) brightness(0.6)'
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
                                        RenoRun
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: isDark ? '#9ca3af' : '#6b7280'
                                    }}>
                                        Software Engineer Intern
                                    </p>
                                </div>
                            </div>

                            <span className="experience-date" style={{
                                fontSize: '0.875rem',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                whiteSpace: 'nowrap'
                            }}>
                                Dec. 2022 - April 2023
                            </span>
                        </div>

                        <motion.button
                            className="experience-btn"
                            onClick={() => toggleExpand('renorun')}
                            animate={{
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                borderColor: isDark ? '#374151' : '#e5e7eb',
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.9)' : '#E5E7EB',
                                color: isDark ? '#E5E7EB' : '#111827',
                                borderColor: isDark ? '#374151' : '#D1D5DB'
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(38, 38, 38, 0.4)' : '#ffffff',
                                color: isDark ? '#d1d5db' : '#374151',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                textAlign: 'left',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                alignSelf: 'flex-start',
                                fontWeight: '500',
                                marginLeft: '52px',
                                marginTop: '4px'
                            }}
                        >
                            {expandedItems['renorun'] ? 'Show less' : 'Read more'}
                            <motion.svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ rotate: expandedItems['renorun'] ? 180 : 0 }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                            {expandedItems['renorun'] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ marginLeft: '52px', marginTop: '0px', paddingBottom: '12px' }}>
                                        <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '0px' }}>
                                            -
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                    border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`,
                    backgroundColor: isDark ? '#0e0e0d' : '#ffffff',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isDark
                        ? '0 0 0 4px #0e0e0d, 0 0 0 5px #374151'
                        : '0 0 0 4px #f5f5f4, 0 0 0 5px #D1D5DB',
                    margin: '4px' // Add margin to prevent shadow clipping
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image
                            src="/assets/queens.png"
                            alt="Queen's University Logo"
                            width={42}
                            height={42}
                            style={{
                                objectFit: 'contain',
                                filter: 'none'
                            }}
                        />
                        <div>
                            <h3 style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                marginBottom: '0px',
                                color: isDark ? 'white' : '#1c1917'
                            }}>
                                Queen's University
                            </h3>
                            <p style={{
                                fontSize: '0.75rem',
                                color: isDark ? '#9ca3af' : '#6b7280'
                            }}>
                                Bachelor of Computing
                            </p>
                        </div>
                    </div>

                    <span style={{
                        fontSize: '0.75rem',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        fontWeight: '500'
                    }}>
                        2028
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
                    {/* Frontend & Frameworks */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Frontend & Frameworks</h3>
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
                            {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'].map((skill, index) => {
                                const logoUrl = getSkillLogo(skill, isDark);
                                return (
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
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'default',
                                            padding: '6px 16px',
                                            backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                            color: isDark ? '#E5E7EB' : '#111827',
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`
                                        }}
                                    >
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="" style={{ width: '16px', height: '16px' }} />
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 18 22 12 16 6"></polyline>
                                                <polyline points="8 6 2 12 8 18"></polyline>
                                            </svg>
                                        )}
                                        {skill}
                                    </motion.span>
                                )
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Backend & Databases */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Backend & Databases</h3>
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
                            {['Node.js', 'Express.js', 'Python', 'Java', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'REST APIs'].map((skill, index) => {
                                const logoUrl = getSkillLogo(skill, isDark);
                                return (
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
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'default',
                                            padding: '6px 16px',
                                            backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                            color: isDark ? '#E5E7EB' : '#111827',
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`
                                        }}
                                    >
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="" style={{ width: '16px', height: '16px' }} />
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 18 22 12 16 6"></polyline>
                                                <polyline points="8 6 2 12 8 18"></polyline>
                                            </svg>
                                        )}
                                        {skill}
                                    </motion.span>
                                )
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Tools & Technologies */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Tools & Technologies</h3>
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
                            {['Git', 'GitHub', 'VS Code', 'Figma', 'Canva', 'Docker', 'AWS', 'Vercel'].map((skill, index) => {
                                const logoUrl = getSkillLogo(skill, isDark);
                                return (
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
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'default',
                                            padding: '6px 16px',
                                            backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                            color: isDark ? '#E5E7EB' : '#111827',
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`
                                        }}
                                    >
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="" style={{ width: '16px', height: '16px' }} />
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 18 22 12 16 6"></polyline>
                                                <polyline points="8 6 2 12 8 18"></polyline>
                                            </svg>
                                        )}
                                        {skill}
                                    </motion.span>
                                )
                            })}
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
                    marginBottom: '24px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Featured Projects
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {projects.filter(p => p.id !== 'portfolio').map((project) => (
                        <SpotlightCard key={project.id} isDark={isDark}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gap: '20px',
                                '@media (min-width: 640px)': {
                                    gridTemplateColumns: '200px 1fr'
                                }
                            } as any}>
                                {/* Left: Preview Image/Video */}
                                <div style={{
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                    backgroundColor: project.solidColor || (isDark ? '#171717' : '#f8f9fa'),
                                    aspectRatio: project.id === 'rooke' ? '2220/1080' :
                                        project.id === 'texify' ? '2292/1080' :
                                            project.id === 'portfolio' ? '2188/1080' :
                                                project.id === 'scribl' ? '2220/1080' :
                                                    project.id === 'clairo' ? '2220/1080' : '16/10',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    minHeight: '140px'
                                }}>
                                    {project.video ? (
                                        <ProjectVideo
                                            src={project.video}
                                            resetTime={project.id === 'portfolio' ? 2 : 0}
                                            iconColor={project.id === 'rooke' ? 'white' : 'black'}
                                            style={{
                                                transform: project.id === 'portfolio' ? 'scale(1.15)' : 'none'
                                            }}
                                        />
                                    ) : project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>{project.icon}</span>
                                    )}
                                </div>

                                {/* Right: Content */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Header with title and status */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                                            <ProjectTitle project={project} isDark={isDark} />
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '4px 10px',
                                                borderRadius: '9999px',
                                                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.6)' : '#f3f4f6',
                                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                                flexShrink: 0
                                            }}>
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        opacity: [1, 0.7, 1]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    style={{
                                                        width: '6px',
                                                        height: '6px',
                                                        borderRadius: '50%',
                                                        backgroundColor: project.status === 'Live' ? '#3b82f6' : '#eab308'
                                                    }}
                                                />
                                                <span style={{
                                                    color: isDark ? '#d1d5db' : '#4b5563',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap'
                                                }}>{project.status}</span>
                                            </div>
                                        </div>
                                        <p style={{
                                            fontSize: '0.8125rem',
                                            color: isDark ? '#9ca3af' : '#6b7280',
                                            lineHeight: '1.5',
                                            margin: 0
                                        }}>
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {project.tags.map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '4px 12px',
                                                    borderRadius: '9999px',
                                                    backgroundColor: isDark ? 'rgba(55, 65, 81, 0.5)' : '#f3f4f6',
                                                    color: isDark ? '#d1d5db' : '#374151',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '500',
                                                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}

                                    </div>

                                    {/* Footer: Buttons */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: 'auto', flexWrap: 'wrap' }}>
                                        <Link
                                            href={`/projects/${project.id}`}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: '#2563eb',
                                                fontSize: '0.8125rem',
                                                fontWeight: '500',
                                                textDecoration: 'underline',
                                                textUnderlineOffset: '3px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            View Details
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <motion.a
                                                href={project.demo || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: isDark
                                                        ? '0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.4), 0 0 75px rgba(59, 130, 246, 0.2)'
                                                        : '0 0 25px rgba(37, 99, 235, 0.6), 0 0 50px rgba(37, 99, 235, 0.3), 0 0 75px rgba(37, 99, 235, 0.15)'
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                                                    color: isDark ? '#e5e7eb' : '#1f2937',
                                                    border: `1px solid ${isDark ? '#374151' : '#d1d5db'}`,
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Demo
                                            </motion.a>
                                            <motion.a
                                                href={project.github || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: isDark
                                                        ? '0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.4), 0 0 75px rgba(59, 130, 246, 0.2)'
                                                        : '0 0 25px rgba(37, 99, 235, 0.6), 0 0 50px rgba(37, 99, 235, 0.3), 0 0 75px rgba(37, 99, 235, 0.15)'
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: isDark ? '#374151' : '#f3f4f6',
                                                    color: isDark ? 'white' : '#1f2937',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    textDecoration: 'none',
                                                    border: `1px solid ${isDark ? '#374151' : '#d1d5db'}`
                                                }}
                                            >
                                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                GitHub
                                            </motion.a>
                                        </div>
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
                        color: isDark ? '#E5E7EB' : '#111827',
                        textDecoration: 'none',
                        backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                        border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`,
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
            <div style={{ height: '12px' }} />
            <Webring />
            <div style={{ height: '80px' }} />

            <FloatingDock />
        </div>
    );
}

