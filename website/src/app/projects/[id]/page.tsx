"use client";

import { projects } from '../../../data/projects';
import { notFound, useParams } from 'next/navigation';
import { ProjectDescription } from '../../../components/ProjectDescription';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../../components/ThemeContext';
import { motion } from 'framer-motion';
import FloatingDock from '../../../components/FloatingDock';

export default function ProjectPage() {
    const { id } = useParams();
    const { isDark } = useTheme();

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Project not found</p>
                <Link href="/" className="ml-4 text-blue-500 underline">Home</Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen pb-32">
            {/* Minimal Header / Back Button */}
            <div className="mb-8 pt-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
                    style={{
                        color: isDark ? '#9ca3af' : '#6b7280',
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    back
                </Link>
            </div>

            {/* Content Container */}
            <article>
                {/* Browser Window Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        borderRadius: '8px',
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
                                    display: 'block'
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
                                backgroundColor: project.status === 'Live' ? '#22c55e' : '#eab308'
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
                                    backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
                                    color: isDark ? '#BFDBFE' : '#1E40AF',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? '#1D4ED8' : '#BFDBFE'}`
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: isDark ? 'white' : '#171717',
                                    color: isDark ? 'black' : 'white',
                                }}
                            >
                                <span className="relative">live demo</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                                    color: isDark ? 'white' : '#171717',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                                <span className="relative">code base</span>
                            </a>
                        )}
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
            </article>

            <FloatingDock />
        </div>
    );
}
