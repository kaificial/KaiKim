"use client";


import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
    const [isDark, setIsDark] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);


    const iconColors = {
        bg: isDark ? '#1f2937' : '#e5e7eb',
        bgHover: isDark ? '#374151' : '#d1d5db',
        icon: isDark ? '#d1d5db' : '#374151'
    };

    return (
        <div className="w-full">
            {/* 
                Hero Section
            */}
            <section className="hero-section">
                <div className="hero-layout">
                    {/* Left Column - Hero Text */}
                    <div className="hero-content">
                        {/* name and title */}
                        <h1 className="hero-title font-bold text-gray-900 dark:text-white tracking-tight leading-none text-left">
                            Kai Kim
                        </h1>
                        <div className="hero-subtitle-row">
                            <span className="hero-subtitle text-gray-900 dark:text-gray-100 font-medium m-0">
                                CS @ Queen's
                            </span>
                            <div className="location-pill">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Toronto, ON
                            </div>
                        </div>

                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl text-left" style={{ marginBottom: '20px' }}>
                            I'm a software developer and student based in Toronto.
                            I build
                            intuitive user experiences.
                        </p>

                        {/* social icon links */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                            {/* GitHub */}
                            <a
                                href="https://github.com/kaificial"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: iconColors.bg,
                                    color: iconColors.icon,
                                    borderRadius: '8px',
                                    transition: 'background-color 0.2s'
                                }}
                                aria-label="GitHub"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bgHover;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bg;
                                }}
                            >
                                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/newjeans/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: iconColors.bg,
                                    color: iconColors.icon,
                                    borderRadius: '8px',
                                    transition: 'background-color 0.2s'
                                }}
                                aria-label="LinkedIn"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bgHover;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bg;
                                }}
                            >
                                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:kaifieldkim@gmail.com"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: iconColors.bg,
                                    color: iconColors.icon,
                                    borderRadius: '8px',
                                    transition: 'background-color 0.2s'
                                }}
                                aria-label="Email"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bgHover;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bg;
                                }}
                            >
                                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>

                            {/* Resume */}
                            <a
                                href="/resume"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: iconColors.bg,
                                    color: iconColors.icon,
                                    borderRadius: '8px',
                                    transition: 'background-color 0.2s'
                                }}
                                aria-label="Resume"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bgHover;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = iconColors.bg;
                                }}
                            >
                                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="hero-image-container">
                        <div className="image-placeholder">
                            <Image
                                src="/assets/latte2.jpg"
                                alt="Kai Kim"
                                width={300}
                                height={300}
                                className="hero-image"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section style={{ marginTop: '48px' }}>
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

                        <button
                            onClick={() => toggleExpand('qmind')}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(243, 244, 246, 0.6)',
                                color: isDark ? '#d1d5db' : '#4b5563',
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
                                transition: 'all 0.2s ease',
                                marginLeft: '68px' // Align with text
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#e5e7eb';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(243, 244, 246, 0.6)';
                            }}>
                            {expandedItems['qmind'] ? 'Show less' : 'Read more'}
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    transform: expandedItems['qmind'] ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </svg>
                        </button>

                        {expandedItems['qmind'] && (
                            <div style={{ marginLeft: '68px', marginTop: '4px' }}>
                                <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                                    Working on machine learning and artificial intelligence projects
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {['Python', 'Machine Learning', 'Neural Networks', 'TensorFlow'].map((skill, index) => (
                                        <span key={index} style={{
                                            padding: '4px 12px',
                                            backgroundColor: '#1d4ed8', // Blue-700
                                            color: 'white',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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

                                <div>
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

                        <button
                            onClick={() => toggleExpand('qac')}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(243, 244, 246, 0.6)',
                                color: isDark ? '#d1d5db' : '#4b5563',
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
                                transition: 'all 0.2s ease',
                                marginLeft: '68px' // Align with text
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#e5e7eb';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(243, 244, 246, 0.6)';
                            }}>
                            {expandedItems['qac'] ? 'Show less' : 'Read more'}
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    transform: expandedItems['qac'] ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </svg>
                        </button>

                        {expandedItems['qac'] && (
                            <div style={{ marginLeft: '68px', marginTop: '4px' }}>
                                <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                                    Developing and maintaining the club's website and digital presence
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {['React', 'Next.js', 'TypeScript', 'Web Design'].map((skill, index) => (
                                        <span key={index} style={{
                                            padding: '4px 12px',
                                            backgroundColor: '#1d4ed8', // Blue-700
                                            color: 'white',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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

                        <button
                            onClick={() => toggleExpand('qbit')}
                            style={{
                                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                background: isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(243, 244, 246, 0.6)',
                                color: isDark ? '#d1d5db' : '#4b5563',
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
                                transition: 'all 0.2s ease',
                                marginLeft: '68px' // Align with text
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#e5e7eb';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(243, 244, 246, 0.6)';
                            }}>
                            {expandedItems['qbit'] ? 'Show less' : 'Read more'}
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    transform: expandedItems['qbit'] ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <path d="M2 4l4 4 4-4" />
                            </svg>
                        </button>

                        {expandedItems['qbit'] && (
                            <div style={{ marginLeft: '68px', marginTop: '4px' }}>
                                <p style={{ fontSize: '0.875rem', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                                    Building software solutions for biomedical innovation projects
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {['C++', 'Python', 'Medical Imaging', 'Git'].map((skill, index) => (
                                        <span key={index} style={{
                                            padding: '4px 12px',
                                            backgroundColor: '#1d4ed8', // Blue-700
                                            color: 'white',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section style={{ marginTop: '48px' }}>
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
                                filter: isDark ? 'invert(1)' : 'none'
                            }}
                        />
                        <div>
                            <h3 style={{
                                fontSize: '0.9375rem',
                                fontWeight: '600',
                                color: isDark ? 'white' : '#1c1917',
                                marginBottom: '0px'
                            }}>
                                Queen's University
                            </h3>
                            <p style={{
                                fontSize: '0.8125rem',
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
            </section>

            {/* Skills Section */}
            <section style={{ marginTop: '48px' }}>
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
                                <span key={index} style={{
                                    padding: '6px 16px',
                                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#e0f2fe',
                                    color: isDark ? '#93c5fd' : '#0369a1',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(3, 105, 161, 0.1)'}`
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Frontend */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Frontend</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['React', 'Next.js', 'Tailwind CSS'].map((skill, index) => (
                                <span key={index} style={{
                                    padding: '6px 16px',
                                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#e0f2fe',
                                    color: isDark ? '#93c5fd' : '#0369a1',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(3, 105, 161, 0.1)'}`
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Backend</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['Node.js', 'Express.js', 'MongoDB'].map((skill, index) => (
                                <span key={index} style={{
                                    padding: '6px 16px',
                                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#e0f2fe',
                                    color: isDark ? '#93c5fd' : '#0369a1',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(3, 105, 161, 0.1)'}`
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tools & Others */}
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '12px', color: isDark ? 'white' : '#1c1917' }}>Tools & Others</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['Git', 'REST APIs', 'VS Code', 'Canva'].map((skill, index) => (
                                <span key={index} style={{
                                    padding: '6px 16px',
                                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#e0f2fe',
                                    color: isDark ? '#93c5fd' : '#0369a1',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(3, 105, 161, 0.1)'}`
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section style={{ marginTop: '48px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: isDark ? 'white' : '#1c1917'
                }}>
                    Featured Projects
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
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
                        <div key={project.id} style={{
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
                                        <span key={i} style={{
                                            padding: '4px 12px',
                                            borderRadius: '9999px',
                                            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#e0f2fe',
                                            color: isDark ? '#93c5fd' : '#0369a1',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(3, 105, 161, 0.1)'}`
                                        }}>
                                            {tech}
                                        </span>
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
                                        <a href="#" style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#2563eb',
                                            color: 'white',
                                            borderRadius: '6px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            Live Demo
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                        <a href="#" style={{
                                            padding: '8px 16px',
                                            backgroundColor: isDark ? '#374151' : '#f3f4f6',
                                            color: isDark ? 'white' : '#1f2937',
                                            borderRadius: '6px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            GitHub
                                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            </section>

            {/* Blank Footer Space */}
            <div style={{ height: '128px' }}></div>
        </div >
    );
}

