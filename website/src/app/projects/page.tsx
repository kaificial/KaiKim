"use client";

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../components/ThemeContext';
import Image from 'next/image';
import { projects } from '../../data/projects';
import { SpotlightCard } from '../../components/SpotlightCard';
import FloatingDock from '../../components/FloatingDock';
import Link from 'next/link';
import { useState } from 'react';
import { ProjectDescription } from '../../components/ProjectDescription';

export default function ProjectsPage() {
    const { isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const filteredProjects = projects.filter(project => {
        const query = searchQuery.toLowerCase();
        return (
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    return (
        <div className="w-full">
            {/* Scroll Progress Bar */}
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#2563eb',
                    transformOrigin: '0%',
                    zIndex: 9999
                }}
            />

            <div style={{
                width: '96%',
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 0 48px 0'
            }}>
                <section>
                    <header style={{ marginBottom: '64px' }}>
                        <motion.h1
                            className="hero-title font-bold text-gray-900 dark:text-white tracking-tight leading-none text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Projects
                        </motion.h1>
                        <motion.p
                            style={{
                                color: isDark ? '#9ca3af' : '#6b7280',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                letterSpacing: '0.15em',
                                maxWidth: '600px',
                                lineHeight: '1.6',
                                marginTop: '4px',
                                whiteSpace: 'normal',
                                opacity: 0.8
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 1.35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            My projects
                        </motion.p>
                    </header>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            marginBottom: '40px',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                left: '16px',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                display: 'flex',
                                alignItems: 'center',
                                pointerEvents: 'none'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, tech, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    borderRadius: '12px',
                                    backgroundColor: isDark ? '#171717' : 'white',
                                    border: `1px solid ${isDark ? '#262626' : '#e5e7eb'}`,
                                    color: isDark ? 'white' : '#1c1917',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#2563eb';
                                    e.currentTarget.style.boxShadow = isDark ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : '0 0 0 3px rgba(37, 99, 235, 0.05)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
                                    e.currentTarget.style.boxShadow = isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.02)';
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: isDark ? '#9ca3af' : '#6b7280',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '4px'
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 450px), 1fr))',
                            gap: '16px'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    <SpotlightCard isDark={isDark}>
                                        {/* Browser Window Mockup */}
                                        <div style={{
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                            marginBottom: '16px'
                                        }}>
                                            {/* Browser Header */}
                                            <div style={{
                                                backgroundColor: '#1f2937',
                                                padding: '10px 12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}>
                                                <div style={{
                                                    flex: 1,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '4px',
                                                    padding: '3px 10px',
                                                    fontSize: '0.65rem',
                                                    color: '#9ca3af',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                    </svg>
                                                    {project.url}
                                                </div>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6b7280' }}></div>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6b7280' }}></div>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6b7280' }}></div>
                                                </div>
                                            </div>

                                            {/* Preview Area */}
                                            <div style={{
                                                height: project.video ? 'auto' : 'clamp(280px, 50vw, 420px)',
                                                aspectRatio: project.video ? '16/9' : 'auto',
                                                backgroundColor: project.solidColor || (isDark ? '#171717' : '#f3f4f6'),
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
                                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                                    />
                                                ) : project.image ? (
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    !project.solidColor && (
                                                        <>
                                                            <span style={{ fontSize: '2rem', marginBottom: '8px' }}>{project.icon}</span>
                                                            <p style={{ fontWeight: '500' }}>{project.title}</p>
                                                        </>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div style={{ padding: '0 4px' }}>
                                            <h3 style={{
                                                fontSize: '1.25rem',
                                                fontWeight: '700',
                                                color: isDark ? 'white' : '#1c1917',
                                                marginBottom: '6px'
                                            }}>
                                                {project.title}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.925rem',
                                                color: isDark ? '#9ca3af' : '#6b7280',
                                                marginBottom: '16px',
                                                lineHeight: '1.5',
                                                display: expandedItems[project.id] ? 'block' : '-webkit-box',
                                                WebkitLineClamp: expandedItems[project.id] ? 'none' : 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: expandedItems[project.id] ? 'visible' : 'hidden'
                                            }}>
                                                {project.description}
                                            </p>

                                            {project.longDescription && (
                                                <>
                                                    <AnimatePresence>
                                                        {expandedItems[project.id] && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                style={{ overflow: 'hidden' }}
                                                            >
                                                                <ProjectDescription content={project.longDescription || ''} />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <motion.button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleExpand(project.id);
                                                        }}
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
                                                            marginBottom: '24px',
                                                            outline: 'none'
                                                        }}
                                                    >
                                                        {expandedItems[project.id] ? 'Show less' : 'Read more'}
                                                        <motion.svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            animate={{ rotate: expandedItems[project.id] ? 180 : 0 }}
                                                        >
                                                            <path d="M2 4l4 4 4-4" />
                                                        </motion.svg>
                                                    </motion.button>
                                                </>
                                            )}

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                                                {project.tags.map((tech, i) => (
                                                    <motion.span
                                                        key={i}
                                                        whileHover={{ scale: 1.1, y: -2 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        style={{
                                                            padding: '6px 16px',
                                                            borderRadius: '9999px',
                                                            backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                                            color: isDark ? '#BFDBFE' : '#1E40AF',
                                                            fontSize: '0.8125rem',
                                                            fontWeight: '500',
                                                            border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`,
                                                            cursor: 'default',
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        backgroundColor: project.status === 'Live' ? '#22c55e' : '#eab308'
                                                    }}></div>
                                                    <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.8125rem', fontWeight: '500' }}>{project.status}</span>
                                                </div>

                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <motion.a
                                                        href={project.demo || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        style={{
                                                            padding: '10px 18px',
                                                            backgroundColor: '#2563eb',
                                                            color: 'white',
                                                            borderRadius: '8px',
                                                            fontSize: '0.8125rem',
                                                            fontWeight: '500',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        Demo
                                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </motion.a>
                                                    <motion.a
                                                        href={project.github || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        style={{
                                                            padding: '10px 18px',
                                                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f3f4f6',
                                                            color: isDark ? 'white' : '#1f2937',
                                                            borderRadius: '8px',
                                                            fontSize: '0.8125rem',
                                                            fontWeight: '500',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            textDecoration: 'none',
                                                            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}`
                                                        }}
                                                    >
                                                        GitHub
                                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredProjects.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: '48px 0',
                                    color: isDark ? '#9ca3af' : '#6b7280'
                                }}
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <p style={{ fontSize: '1.125rem' }}>No projects found matching "{searchQuery}"</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{
                                        marginTop: '16px',
                                        background: 'none',
                                        border: 'none',
                                        color: '#2563eb',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Clear search
                                </button>
                            </motion.div>
                        )}
                        {/* Back to Home Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                marginTop: '16px',
                                marginBottom: '12px'
                            }}
                        >
                            <Link
                                href="/"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: isDark ? '#9ca3af' : '#6b7280',
                                    fontSize: '0.925rem',
                                    fontWeight: '500',
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                                    backgroundColor: isDark ? '#171717' : 'white',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none',
                                    boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.color = isDark ? 'white' : '#1c1917';
                                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
                                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                Back to Home
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                <div style={{ height: '80px' }} />
                <FloatingDock />
            </div>
        </div>
    );
}
