"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeContext";
import FloatingDock from "../../components/FloatingDock";

const mediaData = {
    movies: [
        { id: 'drive', title: 'Drive', year: '2011', poster: '/music/Drive.jpg', rating: 3.5, imdbUrl: 'https://www.imdb.com/title/tt0780504/', description: '', soundtrack: { title: 'Nightcall – Kavinsky', audioPath: '/music/drive.mp3' } },
        { id: 'interstellar', title: 'Interstellar', year: '2014', poster: '/music/Interstellar.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0816692/', description: '', soundtrack: { title: 'Cornfield Chase – Hans Zimmer', audioPath: '/music/Interstellar.mp3' } },
        { id: 'her', title: 'Her', year: '2013', poster: '/music/Her.jpg', rating: 4, imdbUrl: 'https://www.imdb.com/title/tt1798709/', description: '', soundtrack: { title: 'The Moon Song – Scarlett Johansson', audioPath: '/music/media/her.mp3' } },
        { id: 'arrival', title: 'Arrival', year: '2016', poster: '/music/Arrival.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt2543164/', description: '', soundtrack: { title: 'On the Nature of Daylight – Max Richter', audioPath: '/music/media/arrival.mp3' } },
        { id: 'lalaland', title: 'La La Land', year: '2016', poster: '/music/lalaland.jpg', rating: 4.5, imdbUrl: 'https://www.imdb.com/title/tt3783958/', description: '', soundtrack: { title: 'City of Stars – Ryan Gosling', audioPath: '/music/media/lalaland.mp3' } },
    ],
    tv: [
        { id: 'severance', title: 'Severance', year: '2022', poster: '/music/Severance.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt11280740/', description: '', soundtrack: { title: 'Severance Main Title – Theodore Shapiro', audioPath: '/music/media/severance.mp3' } },
        { id: 'barry', title: 'Barry', year: '2018', poster: '/music/Barry.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt5348176/', description: '', soundtrack: { title: 'Barry Theme – David Wingo', audioPath: '/music/media/barry.mp3' } },
        { id: 'breaking-bad', title: 'Breaking Bad', year: '2008', poster: '/music/Breaking Bad.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0903747/', description: '', soundtrack: { title: 'Baby Blue – Badfinger', audioPath: '/music/media/breaking-bad.mp3' } },
        { id: 'jjk', title: 'Jujutsu Kaisen', year: '2020', poster: 'https://image.tmdb.org/t/p/w500/fHpKelh5MzNnpZTpE9tbZQCPXcs.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt12343534/', description: '', soundtrack: { title: 'Kaikai Kitan – Eve', audioPath: '/music/media/jjk.mp3' } },
        { id: 'aot', title: 'Attack on Titan', year: '2013', poster: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt2560140/', description: '', soundtrack: { title: 'Red Swan – YOSHIKI feat. HYDE', audioPath: '/music/AttackOnTitan.mp3' } },
        { id: 'mob-psycho', title: 'Mob Psycho 100', year: '2016', poster: 'https://image.tmdb.org/t/p/w500/vJpXg3UuLwufrLvrNJxuuMBOft0.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt5897304/', description: '', soundtrack: { title: '99 – MOB CHOIR', audioPath: '/music/media/mob-psycho.mp3' } },
    ],
};

type MediaCategory = 'movies' | 'tv';

const SpeakerButton = ({ isActive, onToggle, isDark }: { isActive: boolean; onToggle: () => void; isDark: boolean }) => (
    <motion.button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '20px',
            backgroundColor: isActive
                ? (isDark ? '#60a5fa' : '#3b82f6')
                : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
            border: `1px solid ${isActive ? (isDark ? '#3b82f6' : '#2563eb') : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
            cursor: 'pointer',
            transition: 'all 0.2s',
            height: '24px',
            minWidth: '28px',
        }}
    >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke={isActive ? (isDark ? '#000' : '#fff') : (isDark ? '#a1a1aa' : '#52525b')}
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08" />
        </svg>
        {isActive && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '10px' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [3, 10, 3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        style={{ width: '2px', backgroundColor: isDark ? '#000' : '#fff', borderRadius: '1px' }}
                    />
                ))}
            </div>
        )}
    </motion.button>
);

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

const MediaCollection = ({ isDark, activeTrack, isTrackPlaying, onToggleTrack }: {
    isDark: boolean;
    activeTrack: string | null;
    isTrackPlaying: boolean;
    onToggleTrack: (trackId: string, audioPath: string) => void;
}) => {
    const [activeCategory, setActiveCategory] = useState<MediaCategory>('movies');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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
            {/* Category tabs */}
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

            {/* Items */}
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                {items.map((item, index) => {
                    const isExpanded = !!expandedItems[item.id];
                    const isThisTrackPlaying = activeTrack === `media-${item.id}` && isTrackPlaying;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.25 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
                        >
                            {/* Header row*/}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '16px',
                                flexWrap: 'wrap',
                            }}>
                                {/* Left: poster + title/year */}
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
                                        <Image src={item.poster} alt={item.title} fill style={{ objectFit: 'cover' }} />
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

                                {/* Right: rating + speaker + toggle button */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <RatingDots rating={item.rating} accent={accent} isDark={isDark} />
                                        <SpeakerButton
                                            isActive={isThisTrackPlaying}
                                            onToggle={() => onToggleTrack(`media-${item.id}`, item.soundtrack.audioPath)}
                                            isDark={isDark}
                                        />
                                    </div>
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

                            {/* Read mre toggle */}
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
                                            <p style={{
                                                fontSize: '0.75rem',
                                                color: isDark ? '#4b5563' : '#9ca3af',
                                                marginTop: '8px',
                                                marginBottom: 0,
                                                fontStyle: 'italic',
                                            }}>
                                                {item.soundtrack.title}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Separator */}
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
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeArtist, setActiveArtist] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlayback = (trackId: string, audioPath: string) => {
        const isSameTrack = activeArtist === trackId;
        if (isSameTrack && audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(() => { });
                setIsPlaying(true);
            }
        } else {
            setActiveArtist(trackId);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = audioPath;
            } else {
                audioRef.current = new Audio(audioPath);
                audioRef.current.onended = () => setIsPlaying(false);
            }
            audioRef.current.play().catch(() => { });
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 max-w-2xl">
            <header style={{ marginBottom: '48px' }}>
                <motion.h1
                    className="hero-title font-bold text-gray-900 dark:text-white tracking-tight leading-none text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    Writing
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

            <section>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: isDark ? 'white' : '#1c1917', margin: 0 }}>Media</h2>
                </div>
                <MediaCollection
                    isDark={isDark}
                    activeTrack={activeArtist}
                    isTrackPlaying={isPlaying}
                    onToggleTrack={togglePlayback}
                />
            </section>

            <FloatingDock />
        </div>
    );
}
