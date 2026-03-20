"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { useUISound } from "@/hooks/use-ui-sound";

// nav links for the header
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
];

const MusicWidget = () => {
    const { isDark } = useTheme();
    const { playClick } = useUISound();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const widgetRef = useRef<HTMLDivElement | null>(null);

    // Close music widget when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isExpanded && widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    // Manage global state classes for sticky and fade effects for the widget
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isExpanded) {
            document.body.classList.remove('widget-collapsing');
            document.body.classList.add('widget-expanded');
        } else {
            if (document.body.classList.contains('widget-expanded') && window.scrollY > 40) {
                document.body.classList.add('widget-collapsing');
                // The widget is expanded and stickied on the screen even on movile
                // wait for the animation to finish before snapping it back to normal
                timeoutId = setTimeout(() => {
                    document.body.classList.remove('widget-expanded');
                    document.body.classList.remove('widget-collapsing');
                }, 600);
            } else {
                document.body.classList.remove('widget-expanded');
                document.body.classList.remove('widget-collapsing');
            }
        }

        const handleScroll = () => {
            if (window.scrollY > 40) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        };

        // Check initially
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isExpanded]);
    // Sync duration if already loaded or on metadata load
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;
            const updateDuration = () => {
                if (audio.duration > 0 && isFinite(audio.duration)) {
                    setDuration(audio.duration);
                }
            };

            // Check immediately
            updateDuration();

            audio.addEventListener('loadedmetadata', updateDuration);
            return () => audio.removeEventListener('loadedmetadata', updateDuration);
        }
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        playClick();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(e => console.error("Audio error", e));
                setIsPlaying(true);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
            // Backup: if duration is still 0 but metadata is loaded, sync it
            if (duration === 0 && audioRef.current.duration > 0 && isFinite(audioRef.current.duration)) {
                setDuration(audioRef.current.duration);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current && isFinite(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleScrub = (e: React.MouseEvent<HTMLDivElement> | PointerEvent, container: HTMLDivElement) => {
        if (audioRef.current && duration > 0) {
            const rect = container.getBoundingClientRect();
            const x = ('clientX' in e ? e.clientX : (e as PointerEvent).clientX) - rect.left;
            const percentage = Math.max(0, Math.min(1, x / rect.width));
            const newTime = percentage * duration;
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const container = e.currentTarget;
        handleScrub(e as any, container);

        const onPointerMove = (moveEvent: PointerEvent) => {
            handleScrub(moveEvent, container);
        };

        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "0:00";
        const m = Math.floor(timeInSeconds / 60);
        const s = Math.floor(timeInSeconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const widgetBg = isDark ? (isExpanded ? '#171717' : 'rgba(38, 38, 38, 0.8)') : '#E5E7EB';
    const widgetBorderColor = isDark ? '#374151' : '#D1D5DB';
    const textColor = isDark ? '#E5E7EB' : '#111827';
    const subTextColor = isDark ? '#9ca3af' : '#4b5563';
    const iconColor = isDark ? '#ffffff' : '#111827';
    const waveInactiveColor = isDark ? '#6b7280' : '#9ca3af';
    const progressBgColor = isDark ? '#4b5563' : '#d1d5db';
    const progressFillColor = isDark ? '#ffffff' : '#111827';

    return (
        <motion.div
            ref={widgetRef}
            onClick={() => { setIsExpanded(!isExpanded); playClick(); }}
            initial={false}
            animate={{
                width: isExpanded ? 340 : 130,
                height: isExpanded ? 200 : 36,
                padding: isExpanded ? '16px 20px' : '3px 12px 3px 3px',
                borderRadius: isExpanded ? 36 : 10,
                backgroundColor: widgetBg,
                borderColor: widgetBorderColor
            }}
            transition={{ type: "spring", stiffness: 450, damping: 40 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderStyle: 'solid',
                borderWidth: '1px',
                boxShadow: isExpanded ? (isDark ? '0 25px 60px rgba(0,0,0,0.7), 0 10px 20px rgba(0,0,0,0.4)' : '0 25px 60px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.1)') : 'none',
                zIndex: 1000,
                overflow: 'hidden',
                cursor: 'pointer',
                transformOrigin: 'top center',
                backdropFilter: isExpanded ? 'blur(20px)' : 'none',
            }}
        >
            <audio
                ref={audioRef}
                src="/music/newjean.mp3"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
            {/* Music Widget */}
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                {/* Left side: Album Art + Titles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '12px' : '0px', transition: 'gap 0.3s ease' }}>
                    {/* Album Art Container */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <motion.div
                            initial={false}
                            animate={{
                                width: isExpanded ? 64 : 28,
                                height: isExpanded ? 64 : 28,
                                borderRadius: isExpanded ? 14 : 8,
                                backgroundColor: isExpanded ? 'transparent' : 'rgba(255,255,255,0.2)',
                            }}
                            transition={{ type: "spring", stiffness: 450, damping: 40 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}
                        >
                            <motion.div
                                initial={false}
                                animate={{ padding: isExpanded ? '0px' : '2px' }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ borderRadius: isExpanded ? '12px' : '6px' }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: 'url(/assets/music.jpg)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                    </div>

                    {/* Titles */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}
                            >
                                <span style={{ color: textColor, fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>ETA</span>
                                <span style={{ color: subTextColor, fontSize: '0.95rem', fontWeight: 500 }}>NewJeans</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Collapsed: Scrolling song title + artist (looped) */}
                {!isExpanded && (
                    <div style={{
                        flex: 1,
                        overflow: 'hidden',
                        marginLeft: '6px',
                        marginRight: '6px',
                        minWidth: 0,
                        maskImage: 'linear-gradient(to right, transparent 0%, black 6px, black calc(100% - 6px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6px, black calc(100% - 6px), transparent 100%)',
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                animation: 'marquee-scroll 10s linear infinite',
                                width: 'fit-content',
                            }}
                        >
                            {[0, 1].map((i) => (
                                <span
                                    key={i}
                                    style={{
                                        color: isDark ? '#d1d5db' : '#374151',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        letterSpacing: '-0.01em',
                                        paddingRight: '1.5em',
                                    }}
                                >
                                    ETA &bull; NewJeans
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Right side: Audio visualizaion */}
                <div style={{ display: 'flex', alignItems: 'center', height: '14px', flexShrink: 0 }}>
                    {isExpanded ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '2.5px', paddingRight: '8px' }}
                        >
                            {[
                                { height: isPlaying ? ['4px', '8px', '4px'] : ['4px', '4px', '4px'], delay: 0.0, duration: 1.0 },
                                { height: isPlaying ? ['6px', '14px', '6px'] : ['4px', '4px', '4px'], delay: 0.2, duration: 0.8 },
                                { height: isPlaying ? ['8px', '16px', '8px'] : ['4px', '4px', '4px'], delay: 0.4, duration: 1.2 },
                                { height: isPlaying ? ['5px', '12px', '5px'] : ['4px', '4px', '4px'], delay: 0.6, duration: 0.9 },
                                { height: isPlaying ? ['4px', '8px', '4px'] : ['4px', '4px', '4px'], delay: 0.8, duration: 1.1 }
                            ].map((wave, i) => (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    animate={{ height: wave.height }}
                                    transition={{ duration: wave.duration, repeat: isPlaying ? Infinity : 0, delay: wave.delay, ease: "easeInOut" }}
                                    style={{ width: '3px', backgroundColor: isPlaying ? '#3b82f6' : waveInactiveColor, borderRadius: '4px' }}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        isPlaying ? (
                            <div
                                onClick={togglePlay}
                                style={{ display: 'flex', alignItems: 'center', gap: '2.5px', cursor: 'pointer', paddingRight: '4px' }}
                            >
                                {[
                                    { height: isPlaying ? ['4px', '8px', '4px'] : ['4px', '4px', '4px'], delay: 0.0, duration: 1.0 },
                                    { height: isPlaying ? ['6px', '14px', '6px'] : ['4px', '4px', '4px'], delay: 0.2, duration: 0.8 },
                                    { height: isPlaying ? ['8px', '16px', '8px'] : ['4px', '4px', '4px'], delay: 0.4, duration: 1.2 },
                                    { height: isPlaying ? ['5px', '12px', '5px'] : ['4px', '4px', '4px'], delay: 0.6, duration: 0.9 },
                                    { height: isPlaying ? ['4px', '8px', '4px'] : ['4px', '4px', '4px'], delay: 0.8, duration: 1.1 }
                                ].map((wave, i) => (
                                    <motion.div
                                        key={i}
                                        initial={false}
                                        animate={{ height: wave.height }}
                                        transition={{ duration: wave.duration, repeat: isPlaying ? Infinity : 0, delay: wave.delay, ease: "easeInOut" }}
                                        style={{ width: '3px', backgroundColor: '#3b82f6', borderRadius: '4px' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                onClick={togglePlay}
                                style={{ paddingRight: '4px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            >
                                <Play size={14} color={waveInactiveColor} fill={waveInactiveColor} />
                            </div>
                        )
                    )}
                </div>

            </div>

            {/* Bottom Section (Expanded Only) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.05, duration: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: '12px', paddingBottom: '20px' }}
                    >
                        {/* Progress Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: subTextColor, fontWeight: 500, fontFamily: 'monospace' }}>
                            <span style={{ minWidth: '32px' }}>{formatTime(progress)}</span>
                            <div
                                onPointerDown={handlePointerDown}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    flex: 1,
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ width: '100%', height: '6px', backgroundColor: progressBgColor, borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={false}
                                        animate={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                                        transition={{ ease: "linear", duration: 0.1 }}
                                        style={{ height: '100%', backgroundColor: progressFillColor, borderRadius: '3px' }}
                                    />
                                </div>
                            </div>
                            <span style={{ minWidth: '32px', textAlign: 'right' }}>-{formatTime(Math.max(0, duration - progress))}</span>
                        </div>

                        {/* Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '0 12px' }}>
                            <SkipBack size={24} color={iconColor} fill={iconColor} style={{ cursor: 'pointer', opacity: 0.8 }} onClick={(e) => {
                                e.stopPropagation();
                                playClick();
                                if (audioRef.current) { audioRef.current.currentTime = 0; }
                                setProgress(0);
                            }} />
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlay}
                                style={{ cursor: 'pointer' }}
                            >
                                {isPlaying ? (
                                    <Pause size={32} color={iconColor} fill={iconColor} />
                                ) : (
                                    <Play size={32} color={iconColor} fill={iconColor} />
                                )}
                            </motion.div>
                            <SkipForward size={24} color={iconColor} fill={iconColor} style={{ cursor: 'pointer', opacity: 0.8 }} onClick={(e) => {
                                e.stopPropagation();
                                playClick();
                                if (audioRef.current && duration > 0) { audioRef.current.currentTime = duration - 0.1; }
                            }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default function Header() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const { playClick, playHover, playOn, playOff } = useUISound();

    // State for local display and hover
    const [count, setCount] = useState(0);
    const [displayCount, setDisplayCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // State for mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State for global count and user's specific like status
    const [hasLiked, setHasLiked] = useState(false);

    // Initial count state from API
    useEffect(() => {
        const savedLikeStatus = localStorage.getItem("has-liked-site");
        if (savedLikeStatus === "true") {
            setHasLiked(true);
        }

        const fetchGlobalCount = async () => {
            try {
                const response = await fetch('/api/likes');
                const data = await response.json();
                const globalCount = data.count || 0;

                setCount(globalCount);
                setDisplayCount(0);

                // Animate from 0 to globalCount
                const duration = 2400;
                const startTime = performance.now() + 500;

                const animate = (currentTime: number) => {
                    if (currentTime < startTime) {
                        requestAnimationFrame(animate);
                        return;
                    }

                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
                    const currentDisplay = Math.floor(easeOutQuart(progress) * globalCount);

                    setDisplayCount(currentDisplay);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
            } catch (error) {
                console.error("Failed to sync global likes:", error);
            }
        };

        fetchGlobalCount();
    }, []);

    const handleLikeClick = async () => {
        // prevent clicking if already liked
        if (hasLiked) {
            console.log("✨ You've already liked this site!");
            return;
        }

        // optimistic update - show immediate feedback
        const previousCount = count;
        setCount(count + 1);
        setDisplayCount(count + 1);
        setHasLiked(true);
        localStorage.setItem("has-liked-site", "true");

        try {
            const response = await fetch('/api/likes', { method: 'POST' });
            const data = await response.json();

            if (!response.ok) {
                // handle specific error types
                if (response.status === 429) {
                    // rate limit exceeded

                    // rollback optimistic update
                    setCount(previousCount);
                    setDisplayCount(previousCount);
                    setHasLiked(false);
                    localStorage.removeItem("has-liked-site");

                } else if (response.status === 400 && data.error === "already_liked") {
                    // server says already liked - trust server state
                    // keep the liked state since server confirmed

                } else if (response.status === 403) {
                    // forbidden (CORS or authorization issue)

                    // rollback optimistic update
                    setCount(previousCount);
                    setDisplayCount(previousCount);
                    setHasLiked(false);
                    localStorage.removeItem("has-liked-site");

                } else {
                    // other error
                    throw new Error(data.message || "Failed to like");
                }
                return;
            }

            // success - update with server count
            if (data.count) {
                setCount(data.count);
                setDisplayCount(data.count);
            }

        } catch (error) {
            console.error("Try Again", error);

            // rollback on network or unexpected error
            setCount(previousCount);
            setDisplayCount(previousCount);
            setHasLiked(false);
            localStorage.removeItem("has-liked-site");
        }
    };


    return (
        <header className="header">
            <motion.div
                key={pathname}
                className="header-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative' }}
            >
                {/* Mobile menu button - positioned left on mobile */}
                <div className="mobile-menu-wrapper">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); playClick(); }}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>
                </div>

                <nav className="nav-pill-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${pathname === link.href ? "active" : ""}`}
                                onClick={() => { setIsMobileMenuOpen(false); playClick(); }}
                                onMouseEnter={() => playHover()}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Vertical Divider */}
                    <div className="vertical-divider" style={{ width: '1px', height: '16px', backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />

                    <div style={{ position: 'relative', width: 130, height: 36 }}>
                        <div className="music-widget-wrapper" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                            <MusicWidget />
                        </div>
                    </div>
                </nav>

                <div className="theme-buttons-container" style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                    <motion.div
                        onMouseEnter={() => { setIsHovered(true); playHover(); }}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{ position: 'relative' }}
                    >
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
                                    style={{
                                        position: 'absolute',
                                        bottom: 'calc(100% + 2px)',
                                        left: '50%',
                                        backgroundColor: isDark ? '#1E293B' : 'white',
                                        color: isDark ? 'white' : '#1E293B',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '0.8125rem',
                                        fontWeight: '600',
                                        whiteSpace: 'nowrap',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                                        pointerEvents: 'none',
                                        zIndex: 1100
                                    }}
                                >
                                    Like my site!
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        borderLeft: '6px solid transparent',
                                        borderRight: '6px solid transparent',
                                        borderTop: `6px solid ${isDark ? '#1E293B' : 'white'}`,
                                    }} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            onClick={() => { handleLikeClick(); playClick(); }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                minWidth: '40px',
                                height: '40px',
                                padding: '0 12px',
                                backgroundColor: isDark ? '#171717' : '#f9fafb',
                                border: `1px solid ${hasLiked ? (isDark ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.3)') : (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)')}`,
                                borderRadius: '10px',
                                color: hasLiked ? '#2563eb' : (isDark ? '#94a3b8' : '#64748b'),
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                boxShadow: hasLiked ? '0 2px 10px rgba(37, 99, 235, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Flame
                                size={16}
                                color={hasLiked ? "#2563eb" : (isDark ? "#94a3b8" : "#64748b")}
                                fill={hasLiked ? "#2563eb" : "none"}
                            />
                            {displayCount}
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </header>
    );
}
