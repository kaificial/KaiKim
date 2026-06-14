"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeContext";

const mediaData = {
    movies: [
        { id: 'drive', title: 'Drive', year: '2011', poster: '/music/Drive.jpg', rating: 3.5, imdbUrl: 'https://www.imdb.com/title/tt0780504/', description: '' },
        { id: 'interstellar', title: 'Interstellar', year: '2014', poster: '/music/Interstellar.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0816692/', description: '' },
        { id: 'her', title: 'Her', year: '2013', poster: '/music/Her.jpg', rating: 4, imdbUrl: 'https://www.imdb.com/title/tt1798709/', description: '' },
        { id: 'arrival', title: 'Arrival', year: '2016', poster: '/music/Arrival.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt2543164/', description: '' },
        { id: 'lalaland', title: 'La La Land', year: '2016', poster: '/music/lalaland.jpg', rating: 4.5, imdbUrl: 'https://www.imdb.com/title/tt3783958/', description: '' },
    ],
    tv: [
        { id: 'severance', title: 'Severance', year: '2022', poster: '/music/Severance.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt11280740/', description: '' },
        { id: 'barry', title: 'Barry', year: '2018', poster: '/music/Barry.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt5348176/', description: '' },
        { id: 'breaking-bad', title: 'Breaking Bad', year: '2008', poster: '/music/Breaking Bad.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0903747/', description: '' },
        { id: 'jjk', title: 'Jujutsu Kaisen', year: '2020', poster: 'https://image.tmdb.org/t/p/w185/fHpKelh5MzNnpZTpE9tbZQCPXcs.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt12343534/', description: '' },
        { id: 'aot', title: 'Attack on Titan', year: '2013', poster: 'https://image.tmdb.org/t/p/w185/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt2560140/', description: '' },
        { id: 'mob-psycho', title: 'Mob Psycho 100', year: '2016', poster: 'https://image.tmdb.org/t/p/w185/vJpXg3UuLwufrLvrNJxuuMBOft0.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt5897304/', description: '' },
    ],
};

type MediaCategory = 'movies' | 'tv';

const RatingDots = ({ rating, accent, isDark }: { rating: number; accent: string; isDark: boolean }) => (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((n) => {
            const emptyColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
            return (
                <div key={n} style={{
                    width: '8px', height: '8px', borderRadius: '2px',
                    background: n <= rating ? accent : n - 0.5 === rating
                        ? `linear-gradient(90deg, ${accent} 50%, ${emptyColor} 50%)` : emptyColor,
                    transition: 'background 0.2s',
                }} />
            );
        })}
    </div>
);

const MediaCollection = ({ isDark, startDelay = 0 }: { isDark: boolean; startDelay?: number }) => {
    const [activeCategory, setActiveCategory] = useState<MediaCategory>('movies');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const t = window.setTimeout(() => setIsInitialLoad(false), 4000);
        return () => window.clearTimeout(t);
    }, []);

    const categories: { key: MediaCategory; label: string }[] = [
        { key: 'movies', label: 'Movies' },
        { key: 'tv', label: 'Shows' },
    ];

    const accent = isDark ? '#38bdf8' : '#2563eb';
    const textPrimary = isDark ? '#e4e4e7' : '#18181b';
    const textSecondary = isDark ? '#71717a' : '#6b7280';
    const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

    const items = mediaData[activeCategory];

    const toggle = (id: string) => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '0' }}>
                {categories.map((cat) => (
                    <motion.button
                        key={cat.key}
                        onClick={() => { setActiveCategory(cat.key); setExpandedItems({}); }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0 0 12px',
                            fontSize: '13px',
                            fontWeight: activeCategory === cat.key ? '600' : '400',
                            color: activeCategory === cat.key ? textPrimary : textSecondary,
                            borderBottom: activeCategory === cat.key ? `2px solid ${accent}` : '2px solid transparent',
                            marginBottom: '-1px',
                            transition: 'all 0.2s',
                            letterSpacing: '0.3px',
                        }}
                    >
                        {cat.label}
                    </motion.button>
                ))}
            </div>

            <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                {items.map((item, index) => {
                    const isExpanded = !!expandedItems[item.id];

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: isInitialLoad ? startDelay + index * 0.07 : index * 0.04,
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '16px',
                                flexWrap: 'wrap',
                            }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '50px',
                                        borderRadius: '6px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        flexShrink: 0,
                                        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.12)',
                                    }}>
                                        <Image src={item.poster} alt={item.title} fill sizes="36px" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            marginBottom: '0px',
                                            color: isDark ? 'white' : '#1c1917',
                                        }}>
                                            {item.title}
                                        </h3>
                                        <p style={{ fontSize: '0.875rem', color: textSecondary, margin: 0 }}>
                                            {item.year}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                                    <RatingDots rating={item.rating} accent={accent} isDark={isDark} />
                                    <motion.button
                                        onClick={() => toggle(item.id)}
                                        animate={{
                                            backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                            color: isDark ? '#E5E7EB' : '#111827',
                                            borderColor: isDark ? '#374151' : '#D1D5DB',
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: isDark ? 'rgba(50, 50, 50, 0.9)' : '#d1d5db',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            border: `1px solid ${isDark ? '#374151' : '#D1D5DB'}`,
                                            background: isDark ? 'rgba(38, 38, 38, 0.8)' : '#E5E7EB',
                                            color: isDark ? '#E5E7EB' : '#111827',
                                            fontSize: '0.7rem',
                                            cursor: 'pointer',
                                            padding: '3px 8px',
                                            borderRadius: '9999px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {isExpanded ? 'Show less' : 'My thoughts'}
                                        <motion.svg
                                            width="12" height="12" viewBox="0 0 12 12"
                                            fill="none" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <path d="M2 4l4 4 4-4" />
                                        </motion.svg>
                                    </motion.button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ marginLeft: '48px', paddingTop: '8px', paddingBottom: '4px' }}>
                                            <p style={{
                                                fontSize: '0.875rem',
                                                lineHeight: 1.65,
                                                color: isDark ? '#d1d5db' : '#4b5563',
                                                margin: 0,
                                            }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {index < items.length - 1 && (
                                <div style={{ height: '1px', backgroundColor: borderColor, marginTop: '14px' }} />
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default function NotesPage() {
    const { isDark } = useTheme();

    return (
        <div className="container mx-auto px-4 py-24 max-w-2xl">
            <header style={{ marginBottom: '48px' }}>
                <motion.h1
                    className="hero-title font-bold text-gray-900 dark:text-white tracking-tight leading-none text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    Notes
                </motion.h1>
                <motion.p
                    className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl text-left"
                    style={{ marginTop: '16px', marginBottom: '0' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    Films and TV are a big part of my personal life. This is a collection of random thoughts & ratings on movies, shows, and other media
                </motion.p>
            </header>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: isDark ? 'white' : '#1c1917', margin: 0 }}>Media</h2>
                </div>
                <MediaCollection isDark={isDark} startDelay={1.9} />
            </motion.section>

            <div className="footer-spacer" />
        </div>
    );
}
