"use client";

import { useState, useEffect } from 'react';
import { projects } from '../../../data/projects';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ProjectDescription } from '../../../components/ProjectDescription';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../../components/ThemeContext';
import { motion } from 'framer-motion';
import FloatingDock from '../../../components/FloatingDock';
import ReadingProgressPill from '../../../components/ReadingProgressPill';

// Map path name to a friendly page name
function getPageLabel(pathname: string): string {
    if (pathname === '/') return 'home';
    if (pathname === '/projects') return 'projects';
    if (pathname === '/writing') return 'writing';
    if (pathname === '/notes') return 'notes';
    if (pathname.startsWith('/projects/')) return 'projects';
    return 'back';
}

export default function ProjectPage() {
    const { id } = useParams();
    const { isDark } = useTheme();
    const router = useRouter();
    const [referrerLabel, setReferrerLabel] = useState('back');

    // Determine what page the user came from using sessionStorage
    useEffect(() => {
        try {
            const prevPath = sessionStorage.getItem('prevPath');
            if (prevPath) {
                setReferrerLabel(getPageLabel(prevPath));
            }
        } catch {
            // ignore storage errors
        }
    }, []);

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Project not found</p>
                <Link href="/" className="ml-4 text-blue-500 underline">Home</Link>
            </div>
        );
    }

    const hasLongDescription = !!project.longDescription;

    return (
        <div className="w-full min-h-screen pb-32">
            {/* Sticky Header: Back Button and Reading Progress bar */}
            <div className="nav-pill-container" style={{
                position: 'sticky',
                top: '16px',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                left: 'auto',
                transform: 'none'
            }}>
                <button
                    onClick={() => router.back()}
                    className="nav-link active"
                    style={{
                        gap: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8125rem'
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back<span className="hidden sm:inline"> to {referrerLabel.charAt(0).toUpperCase() + referrerLabel.slice(1)}</span>
                </button>

                {/* Center: Reading Progress Pill */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '-18px', // Fixed top position so it grows downwards from current center
                    zIndex: 1000,
                    display: 'block', // Overrides globals.scss display: none
                }}>
                    <ReadingProgressPill contentSelector="article" projectTitle={project.title} />
                </div>

                {/* Right: Action Buttons */}
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link active"
                            style={{
                                gap: '4px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                            }}
                        >
                            <span className="hidden sm:inline" style={{ position: 'relative', top: '1px' }}>Demo</span>
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link active"
                            style={{
                                gap: '4px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                            }}
                        >
                            <span className="hidden sm:inline" style={{ position: 'relative', top: '1px' }}>GitHub</span>
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                    )}
                </div>
            </div>

            <div style={{ height: '22px' }} />

            {/* Content Container */}
            <article>
                {/* Browser Window Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        marginBottom: '24px'
                    }}
                >
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
                        width: '100%',
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
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    transform: project.id === 'portfolio' ? 'scale(1.15)' : 'none'
                                }}
                            />
                        ) : project.image ? (
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ) : null}
                    </div>
                </motion.div>

                {/* Title & Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '16px' }}>
                        <h1 style={{
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: isDark ? 'white' : '#1c1917',
                            margin: 0,
                            lineHeight: 1.2
                        }}>
                            {project.title}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: project.status === 'Live' ? '#3b82f6' : '#eab308'
                            }}></div>
                            <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.8125rem', fontWeight: '500' }}>{project.status}</span>
                        </div>
                    </div>

                    <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        marginBottom: '24px'
                    }}>
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                        {project.tags.map((tech, i) => (
                            <span
                                key={i}
                                style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                    color: isDark ? '#E5E7EB' : '#111827',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>


                </motion.div>

                {/* Long Description */}
                {project.longDescription && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ProjectDescription content={project.longDescription} />
                    </motion.div>
                )}

                <div style={{ height: '120px' }} />
            </article>

            <FloatingDock />
        </div>
    );
}
