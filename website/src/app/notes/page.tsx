"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../../components/ThemeContext";

// --- Media Data & Components (Extracted from Interests) ---

const mediaData = {
    movies: [
        { id: 'drive', title: 'Drive', year: '2011', poster: '/music/Drive.jpg', rating: 3.5, imdbUrl: 'https://www.imdb.com/title/tt0780504/', description: 'Add your thoughts about Drive here...', soundtrack: { title: 'Nightcall – Kavinsky', audioPath: '/music/drive.mp3' } },
        { id: 'interstellar', title: 'Interstellar', year: '2014', poster: '/music/Interstellar.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0816692/', description: 'Add your thoughts about Interstellar here...', soundtrack: { title: 'Cornfield Chase – Hans Zimmer', audioPath: '/music/Interstellar.mp3' } },
        { id: 'her', title: 'Her', year: '2013', poster: '/music/Her.jpg', rating: 4, imdbUrl: 'https://www.imdb.com/title/tt1798709/', description: 'Add your thoughts about Her here...', soundtrack: { title: 'The Moon Song – Scarlett Johansson', audioPath: '/music/media/her.mp3' } },
        { id: 'arrival', title: 'Arrival', year: '2016', poster: '/music/Arrival.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt2543164/', description: 'Add your thoughts about Arrival here...', soundtrack: { title: 'On the Nature of Daylight – Max Richter', audioPath: '/music/media/arrival.mp3' } },
        { id: 'lalaland', title: 'La La Land', year: '2016', poster: '/music/lalaland.jpg', rating: 4.5, imdbUrl: 'https://www.imdb.com/title/tt3783958/', description: 'Add your thoughts about La La Land here...', soundtrack: { title: 'City of Stars – Ryan Gosling', audioPath: '/music/media/lalaland.mp3' } },
    ],
    tv: [
        { id: 'severance', title: 'Severance', year: '2022', poster: '/music/Severance.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt11280740/', description: 'Mind-bending corporate dystopia with impeccable world-building. The mystery keeps you guessing every episode.', soundtrack: { title: 'Severance Main Title – Theodore Shapiro', audioPath: '/music/media/severance.mp3' } },
        { id: 'barry', title: 'Barry', year: '2018', poster: '/music/Barry.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt5348176/', description: 'Add your thoughts about Barry here...', soundtrack: { title: 'Barry Theme – David Wingo', audioPath: '/music/media/barry.mp3' } },
        { id: 'breaking-bad', title: 'Breaking Bad', year: '2008', poster: '/music/Breaking Bad.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0903747/', description: 'Add your thoughts about Breaking Bad here...', soundtrack: { title: 'Baby Blue – Badfinger', audioPath: '/music/media/breaking-bad.mp3' } },
    ],
    anime: [
        { id: 'jjk', title: 'Jujutsu Kaisen', year: '2020', poster: 'https://image.tmdb.org/t/p/w500/fHpKelh5MzNnpZTpE9tbZQCPXcs.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt12343534/', description: 'Add your thoughts about Jujutsu Kaisen here...', soundtrack: { title: 'Kaikai Kitan – Eve', audioPath: '/music/media/jjk.mp3' } },
        { id: 'aot', title: 'Attack on Titan', year: '2013', poster: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt2560140/', description: 'Add your thoughts about Attack on Titan here...', soundtrack: { title: 'Red Swan – YOSHIKI feat. HYDE', audioPath: '/music/AttackOnTitan.mp3' } },
        { id: 'mob-psycho', title: 'Mob Psycho 100', year: '2016', poster: 'https://image.tmdb.org/t/p/w500/vJpXg3UuLwufrLvrNJxuuMBOft0.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt5897304/', description: 'Add your thoughts about Mob Psycho 100 here...', soundtrack: { title: '99 – MOB CHOIR', audioPath: '/music/media/mob-psycho.mp3' } },
    ]
};

type MediaCategory = 'movies' | 'tv' | 'anime';

const ArtistSpeaker = ({
    isActive,
    onToggle,
    isDark
}: {
    isActive: boolean;
    onToggle: () => void;
    isDark: boolean;
}) => {

    return (
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                margin: '0 2px',
                padding: '4px 8px',
                borderRadius: '20px',
                backgroundColor: isActive
                    ? (isDark ? '#60a5fa' : '#3b82f6')
                    : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                border: `1px solid ${isActive ? (isDark ? '#3b82f6' : '#2563eb') : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')}`,
                cursor: 'pointer',
                verticalAlign: 'middle',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.4)' : 'none',
                minWidth: '32px',
                height: '24px'
            }}
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isActive ? (isDark ? '#000' : '#fff') : (isDark ? '#a1a1aa' : '#52525b')}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08" />
            </svg>

            {isActive && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: [4, 12, 4],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                            }}
                            style={{
                                width: '2px',
                                backgroundColor: isDark ? '#000' : '#fff',
                                borderRadius: '1px',
                            }}
                        />
                    ))}
                </div>
            )}
        </motion.button>
    );
};

const MediaCollection = ({ isDark, activeTrack, isTrackPlaying, onToggleTrack }: {
    isDark: boolean;
    activeTrack: string | null;
    isTrackPlaying: boolean;
    onToggleTrack: (trackId: string, audioPath: string) => void;
}) => {
    const [activeCategory, setActiveCategory] = useState<MediaCategory>('movies');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const categories: { key: MediaCategory; label: string }[] = [
        { key: 'movies', label: 'Movies' },
        { key: 'tv', label: 'Shows' },
        { key: 'anime', label: 'Anime' },
    ];

    const items = mediaData[activeCategory];
    const selected = selectedItem
        ? items.find(item => item.id === selectedItem) || null
        : null;

    // clean color palette
    const bg = isDark ? '#111113' : '#ffffff';
    const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
    const accent = isDark ? '#38bdf8' : '#2563eb';
    const textPrimary = isDark ? '#e4e4e7' : '#18181b';
    const textSecondary = isDark ? '#71717a' : '#a1a1aa';
    const textMuted = isDark ? '#3f3f46' : '#d4d4d8';
    const rowHover = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
    const selectedBg = isDark ? 'rgba(56, 189, 248, 0.06)' : 'rgba(37, 99, 235, 0.04)';

    return (
        <div style={{
            backgroundColor: bg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            overflow: 'hidden',
            boxShadow: isDark ? `0 0 40px -10px ${accent}20, 0 0 20px rgba(0,0,0,0.4)` : '0 10px 40px -10px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 20px 0',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                }}>
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.key}
                            onClick={() => { setActiveCategory(cat.key); setSelectedItem(null); }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0 0 12px',
                                fontSize: '13px',
                                fontWeight: activeCategory === cat.key ? '600' : '400',
                                color: activeCategory === cat.key ? textPrimary : textSecondary,
                                textShadow: activeCategory === cat.key && isDark ? `0 0 15px ${accent}80` : 'none',
                                borderBottom: activeCategory === cat.key
                                    ? `2px solid ${accent}`
                                    : '2px solid transparent',
                                transition: 'all 0.2s',
                                letterSpacing: '0.3px',
                            }}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </div>
                <span style={{
                    fontSize: '11px',
                    color: textSecondary,
                    fontFamily: "'Courier New', monospace",
                }}>
                    {items.length} titles
                </span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: borderColor }} />

            {/* List */}
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
            >
                {items.map((item, index) => {
                    const isSelected = selected?.id === item.id;
                    const isHovered = hoveredRow === item.id;
                    const isThisTrackPlaying = activeTrack === `media-${item.id}` && isTrackPlaying;

                    return (
                        <React.Fragment key={item.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04, duration: 0.25 }}
                                onClick={() => setSelectedItem(isSelected ? null : item.id)}
                                onMouseEnter={() => setHoveredRow(item.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                style={{
                                    padding: '12px 20px',
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    background: isSelected
                                        ? `linear-gradient(90deg, ${selectedBg}, transparent)`
                                        : isHovered ? rowHover : 'transparent',
                                    borderLeft: isSelected ? `3px solid ${accent}` : '3px solid transparent',
                                    borderBottom: `1px solid ${borderColor}`,
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {/* Number */}
                                <span style={{
                                    width: '20px',
                                    fontSize: '11px',
                                    fontFamily: "'Courier New', monospace",
                                    color: isSelected ? accent : textMuted,
                                    fontWeight: '500',
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* Small poster thumbnail */}
                                <motion.div
                                    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                                    style={{
                                        width: '32px',
                                        height: '44px',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        flexShrink: 0,
                                        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.1)',
                                        cursor: 'zoom-in'
                                    }}
                                >
                                    <Image
                                        src={item.poster}
                                        alt={item.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </motion.div>

                                {/* Title + Year */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '13px',
                                        fontWeight: isSelected ? '600' : '400',
                                        color: isSelected ? accent : textPrimary,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        transition: 'color 0.15s',
                                    }}>
                                        {item.title}
                                    </div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: textSecondary,
                                        marginTop: '1px',
                                    }}>
                                        {item.year}
                                    </div>
                                </div>

                                {/* Rating dots */}
                                <div style={{
                                    display: 'flex',
                                    gap: '3px',
                                    alignItems: 'center',
                                }}>
                                    {[1, 2, 3, 4, 5].map((n) => {
                                        const emptyColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                                        return (
                                            <div
                                                key={n}
                                                style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '2px',
                                                    background: n <= item.rating
                                                        ? accent
                                                        : n - 0.5 === item.rating
                                                            ? `linear-gradient(90deg, ${accent} 50%, ${emptyColor} 50%)`
                                                            : emptyColor,
                                                    transition: 'background 0.2s',
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Speaker button */}
                                <ArtistSpeaker
                                    isActive={isThisTrackPlaying}
                                    onToggle={() => onToggleTrack(`media-${item.id}`, item.soundtrack.audioPath)}
                                    isDark={isDark}
                                />

                                {/* Arrow indicator */}
                                <motion.span
                                    animate={{ rotate: isSelected ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        fontSize: '12px',
                                        color: isSelected ? accent : textMuted,
                                        lineHeight: 1,
                                    }}
                                >
                                    ›
                                </motion.span>
                            </motion.div>

                            {/* Inline Detail Panel */}
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        key={`detail-${item.id}`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{
                                            padding: '20px',
                                            display: 'flex',
                                            gap: '20px',
                                            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                                            borderBottom: `1px solid ${borderColor}`,
                                        }}>
                                            {/* Poster */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.05 }}
                                                style={{
                                                    width: '110px',
                                                    minWidth: '110px',
                                                    aspectRatio: '2/3',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    boxShadow: isDark
                                                        ? '0 8px 24px rgba(0,0,0,0.5)'
                                                        : '0 8px 24px rgba(0,0,0,0.12)',
                                                }}
                                            >
                                                <Image
                                                    src={item.poster}
                                                    alt={item.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </motion.div>

                                            {/* Info */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.08 }}
                                                    style={{
                                                        fontSize: '18px',
                                                        fontWeight: '600',
                                                        color: textPrimary,
                                                        marginBottom: '4px',
                                                    }}
                                                >
                                                    {item.title}
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.12 }}
                                                    style={{
                                                        display: 'flex',
                                                        gap: '12px',
                                                        alignItems: 'center',
                                                        marginBottom: '12px',
                                                    }}
                                                >
                                                    <span style={{
                                                        fontSize: '12px',
                                                        color: textSecondary,
                                                    }}>
                                                        {item.year}
                                                    </span>
                                                    <div style={{ display: 'flex', gap: '3px' }}>
                                                        {[1, 2, 3, 4, 5].map((n) => {
                                                            const emptyColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                                                            return (
                                                                <div
                                                                    key={n}
                                                                    style={{
                                                                        width: '10px',
                                                                        height: '10px',
                                                                        borderRadius: '2px',
                                                                        background: n <= item.rating
                                                                            ? accent
                                                                            : n - 0.5 === item.rating
                                                                                ? `linear-gradient(90deg, ${accent} 50%, ${emptyColor} 50%)`
                                                                                : emptyColor,
                                                                        transition: 'background 0.2s',
                                                                    }}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>

                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.16 }}
                                                    style={{
                                                        fontSize: '13px',
                                                        lineHeight: 1.7,
                                                        color: textSecondary,
                                                        margin: '0 0 16px 0',
                                                    }}
                                                >
                                                    {item.description}
                                                </motion.p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </React.Fragment>
                    );
                })}
            </motion.div>
        </div>
    );
};

// --- Notes Page Component ---

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
                audioRef.current.play().catch(e => console.log("Playback failed", e));
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
            audioRef.current.play().catch(e => console.log("Playback failed", e));
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 max-w-2xl">
            <h1 className="text-3xl font-bold mb-12">Notes</h1>



            <section>
                <h2 className="text-2xl font-bold mb-6">Media</h2>
                <MediaCollection
                    isDark={isDark}
                    activeTrack={activeArtist}
                    isTrackPlaying={isPlaying}
                    onToggleTrack={togglePlayback}
                />
            </section>
        </div>
    );
}
