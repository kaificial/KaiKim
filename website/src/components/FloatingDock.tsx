"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeContext';

interface TooltipProps {
    text: string;
}

const Tooltip = ({ text }: TooltipProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
        exit={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
        style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            left: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 1001
        }}
    >
        {text}
        <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '4px solid rgba(0, 0, 0, 0.8)'
        }} />
    </motion.div>
);

export default function FloatingDock() {
    const pathname = usePathname();
    const router = useRouter();
    const { isDark, toggleTheme } = useTheme();
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const handleHomeClick = () => {
        if (pathname === '/') {
            // Already on home page just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Navigate to home and scroll to top
            router.push('/');
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const handleProjectsClick = () => {
        if (pathname === '/projects') {
            // Already on projects page just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Navigate to projects and scroll to top
            router.push('/projects');
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <motion.div
            key={pathname}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, x: '-50%' },
                visible: {
                    opacity: 1,
                    x: '-50%',
                    transition: {
                        duration: 1.4,
                        delay: 2.4, // Increased delay to appear after page content
                        ease: [0.22, 1, 0.36, 1],
                        staggerChildren: 0.08,
                        delayChildren: 2.8 // Delay for icons to start popping in
                    }
                }
            }}
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
            className="floating-dock"
        >
            {/* Home */}
            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                }}
                onMouseEnter={() => setHoveredIcon('home')}
                onMouseLeave={() => setHoveredIcon(null)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'relative' }}
            >
                <button
                    onClick={handleHomeClick}
                    style={{
                        backgroundColor: (pathname === "/" || hoveredIcon === "home") ? (isDark ? '#374151' : '#f3f4f6') : 'transparent',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: (pathname === "/" && !isDark) ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        color: (pathname === "/" || hoveredIcon === "home") ? (isDark ? 'white' : 'black') : (isDark ? '#9ca3af' : '#6b7280'),
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                    }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </button>
                <AnimatePresence>
                    {hoveredIcon === 'home' && <Tooltip text="Home" />}
                </AnimatePresence>
            </motion.div>

            {/* Projects */}
            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                }}
                onMouseEnter={() => setHoveredIcon('projects')}
                onMouseLeave={() => setHoveredIcon(null)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'relative' }}
            >
                <button
                    onClick={handleProjectsClick}
                    style={{
                        backgroundColor: (pathname === "/projects" || hoveredIcon === "projects") ? (isDark ? '#374151' : '#f3f4f6') : 'transparent',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: (pathname === "/projects" && !isDark) ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        color: (pathname === "/projects" || hoveredIcon === "projects") ? (isDark ? 'white' : 'black') : (isDark ? '#9ca3af' : '#6b7280'),
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                    }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <polyline points="9 10 11 12 9 14"></polyline>
                        <line x1="13" y1="14" x2="17" y2="14"></line>
                    </svg>
                </button>
                <AnimatePresence>
                    {hoveredIcon === 'projects' && <Tooltip text="Projects" />}
                </AnimatePresence>
            </motion.div>

            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                }}
                className="mobile-hide"
                style={{ width: '1px', height: '20px', backgroundColor: isDark ? '#4b5563' : '#d1d5db', margin: '0 4px' }}
            />

            <div style={{ display: 'flex', gap: '4px' }}>
                {[
                    { id: 'github', href: "https://github.com/kaificial", label: 'GitHub', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
                    { id: 'linkedin', href: "https://linkedin.com/newjeans", label: 'LinkedIn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                    { id: 'resume', href: "/resume", label: 'Resume', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
                    { id: 'contact', href: "mailto:kaikimto@gmail.com", label: 'Mail: kaikimto@gmail.com', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> }
                ].map((social) => (
                    <motion.a
                        key={social.id}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 10 },
                            visible: { opacity: 1, scale: 1, y: 0 }
                        }}
                        onMouseEnter={() => setHoveredIcon(social.id)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={social.href}
                        target={social.href.startsWith('http') ? "_blank" : undefined}
                        rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                            {social.icon}
                        </div>
                        <AnimatePresence>
                            {hoveredIcon === social.id && <Tooltip text={social.label} />}
                        </AnimatePresence>
                    </motion.a>
                ))}
            </div>

            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                }}
                className="mobile-hide"
                style={{ width: '1px', height: '20px', backgroundColor: isDark ? '#4b5563' : '#d1d5db', margin: '0 4px' }}
            />

            {/* hide spotify on mobile */}
            <motion.a
                className="mobile-hide"
                href="https://spti.fi/kaikim"
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                }}
                onMouseEnter={() => setHoveredIcon('spotify')}
                onMouseLeave={() => setHoveredIcon(null)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#9ca3af' : '#6b7280' }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 14.82 1.14.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.439.3z" /></svg>
                <AnimatePresence>
                    {hoveredIcon === 'spotify' && <Tooltip text="Spotify" />}
                </AnimatePresence>
            </motion.a>

            <motion.button
                variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                }}
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
                {isDark ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" fill="currentColor"></circle>
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                )}
                <AnimatePresence>
                    {hoveredIcon === 'theme' && <Tooltip text={isDark ? "Light Mode" : "Dark Mode"} />}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
}
