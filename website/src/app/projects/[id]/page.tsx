"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../../../components/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../../../data/projects';
import { ProjectDescription } from '../../../components/ProjectDescription';
import FloatingDock from '../../../components/FloatingDock';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProjectDetailContent id={id} />;
}

function ProjectDetailContent({ id }: { id: string }) {
    const { isDark } = useTheme();
    const project = projects.find(p => p.id === id);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!project) {
        notFound();
    }

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
                {/* Back Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ marginBottom: '32px' }}
                >
                    <Link
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: isDark ? '#9ca3af' : '#6b7280',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.color = isDark ? 'white' : '#1c1917';
                            e.currentTarget.style.gap = '8px';
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
                            e.currentTarget.style.gap = '6px';
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>

                {/* Project Header */}
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ marginBottom: '32px' }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '16px',
                        marginBottom: '16px'
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 'bold',
                            color: isDark ? 'white' : '#1c1917',
                            margin: 0
                        }}>
                            {project.title}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: project.status === 'Live' ? '#22c55e' : '#eab308'
                            }}></div>
                            <span style={{
                                color: isDark ? '#d1d5db' : '#4b5563',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}>
                                {project.status}
                            </span>
                        </div>
                    </div>

                    <p style={{
                        fontSize: '1.125rem',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        marginBottom: '24px',
                        lineHeight: '1.7'
                    }}>
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {project.tags.map((tech, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                style={{
                                    display: 'inline-block',
                                    padding: '6px 16px',
                                    borderRadius: '9999px',
                                    backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                    color: isDark ? '#BFDBFE' : '#1E40AF',
                                    fontSize: '0.8125rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <motion.a
                            href={project.demo || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '0.9375rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none'
                            }}
                        >
                            Live Demo
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href={project.github || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f3f4f6',
                                color: isDark ? 'white' : '#1f2937',
                                borderRadius: '8px',
                                fontSize: '0.9375rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}`
                            }}
                        >
                            GitHub
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </motion.a>
                    </div>
                </motion.header>

                {/* Hero Media */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        marginBottom: '48px',
                        backgroundColor: project.solidColor || (isDark ? '#171717' : '#f3f4f6')
                    }}
                >
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
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            paddingBottom: '56.25%'
                        }}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            height: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9ca3af'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}>
                                    {project.icon || '📦'}
                                </span>
                                <p style={{ fontWeight: '500' }}>{project.title}</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Project Details */}
                {project.longDescription && project.longDescription !== '___' && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{
                            marginBottom: '48px'
                        }}
                    >
                        <h2 style={{
                            fontSize: '1.875rem',
                            fontWeight: 'bold',
                            color: isDark ? 'white' : '#1c1917',
                            marginBottom: '24px'
                        }}>
                            About This Project
                        </h2>
                        <ProjectDescription content={project.longDescription} />
                    </motion.section>
                )}

                {/* Back to Projects Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{ marginTop: '48px', textAlign: 'center' }}
                >
                    <Link
                        href="/projects"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#2563eb',
                            fontSize: '0.9375rem',
                            fontWeight: '500',
                            textDecoration: 'none',
                            padding: '12px 0'
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.textDecoration = 'none';
                        }}
                    >
                        View All Projects
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </motion.div>

                <div style={{ height: '80px' }} />
                <FloatingDock />
            </div>
        </div>
    );
}
