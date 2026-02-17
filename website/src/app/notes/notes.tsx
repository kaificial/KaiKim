"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from 'lucide-react';
import Image from "next/image";
import { useTheme } from "../../components/ThemeContext";
import FloatingDock from "../../components/FloatingDock";

// Audio Components 

const AudioPlayer = ({ src, title, artist }: { src: string, title: string, artist: string }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-100 dark:border-white/5 my-8" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={togglePlay}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
            >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>
            <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
        </div>
    );
};

const HerReviewContent = () => {
    const { isDark } = useTheme();

    return (
        <div className="prose dark:prose-invert prose-sm max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-p:leading-relaxed prose-p:text-gray-800 dark:prose-p:text-gray-300">
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                <span className="font-bold">Synopsis:</span> Guy gets dumped by AI girlfriend.
            </p>
            <p>
                With Valentine&apos;s Day coming up, I decided to revisit Spike Jonze&apos;s <em>Her</em>. The last time I saw this movie, I was...
            </p>

            <Link href="/notes/her" passHref legacyBehavior>
                <motion.a
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
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        textAlign: 'left',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontWeight: '500',
                        marginTop: '12px',
                        textDecoration: 'none'
                    }}
                >
                    Read more
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2 4l4 4 4-4" />
                    </svg>
                </motion.a>
            </Link>
        </div>
    );
};

// From Interests Page

const mediaData = {
    movies: [
        { id: 'drive', title: 'Drive', year: '2011', poster: '/music/Drive.jpg', rating: 3.5, imdbUrl: 'https://www.imdb.com/title/tt0780504/', description: 'Add your thoughts about Drive here...', soundtrack: { title: 'Nightcall – Kavinsky', audioPath: '/music/drive.mp3' } },
        { id: 'interstellar', title: 'Interstellar', year: '2014', poster: '/music/Interstellar.jpg', rating: 5, imdbUrl: 'https://www.imdb.com/title/tt0816692/', description: 'Add your thoughts about Interstellar here...', soundtrack: { title: 'Cornfield Chase – Hans Zimmer', audioPath: '/music/Interstellar.mp3' } },
        {
            id: 'her',
            title: 'Her',
            year: '2013',
            poster: '/music/Her.jpg',
            rating: 4,
            imdbUrl: 'https://www.imdb.com/title/tt1798709/',
            description: 'Guy gets done dirty by AI girlfriend.',
            content: <HerReviewContent />,
            soundtrack: { title: 'The Moon Song – Scarlett Johansson', audioPath: '/music/Her.mp3' }
        },
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

    // Colour Palette
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

            {/* List of media, movies,  etc. */}
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
                                <span style={{
                                    width: '20px',
                                    fontSize: '11px',
                                    fontFamily: "'Courier New', monospace",
                                    color: isSelected ? accent : textMuted,
                                    fontWeight: '500',
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* Small movie poster */}
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
                                            padding: '24px',
                                            display: 'flex',
                                            gap: '24px',
                                            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                                            borderBottom: `1px solid ${borderColor}`,
                                            flexDirection: 'column' // Changed to column for longer descriptions
                                        }}>
                                            <div style={{ display: 'flex', gap: '24px' }}>
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

                                                    {/* Render custom content if available, otherwise just description */}
                                                    {item.content ? (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.16 }}
                                                        >
                                                            {item.content}
                                                        </motion.div>
                                                    ) : (
                                                        <motion.p
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.16 }}
                                                            style={{
                                                                fontSize: '13px',
                                                                lineHeight: 1.7,
                                                                color: textSecondary,
                                                                margin: '0',
                                                            }}
                                                        >
                                                            {item.description}
                                                        </motion.p>
                                                    )}
                                                </div>
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

// --- Notes Page Components ---

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
            <h1 className="text-[2rem] font-bold mb-12">Notes</h1>

            <section>
                <div className="flex items-baseline justify-between mb-6">
                    <h2 className="text-2xl font-bold">Media</h2>
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
