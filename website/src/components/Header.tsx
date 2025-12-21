"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";

// nav links for the header
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
];

export default function Header() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const [count, setCount] = useState(0);
    const [displayCount, setDisplayCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Initial count state from localStorage
    useEffect(() => {
        const savedCount = localStorage.getItem("love-count");
        if (savedCount) {
            const finalCount = parseInt(savedCount);
            setCount(finalCount);

            setDisplayCount(0);

            // Animate from 0 to finalCount
            const duration = 2400;
            const startTime = performance.now() + 500; // Start after 500ms

            const animate = (currentTime: number) => {
                if (currentTime < startTime) {
                    requestAnimationFrame(animate);
                    return;
                }

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
                const currentDisplay = Math.floor(easeOutQuart(progress) * finalCount);

                setDisplayCount(currentDisplay);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, []);

    return (
        <header className="header">
            <motion.div
                key={pathname}
                className="header-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <nav className="header-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                    <motion.div
                        onMouseEnter={() => setIsHovered(true)}
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
                            onClick={() => {
                                const newCount = count + 1;
                                setCount(newCount);
                                setDisplayCount(newCount);
                                setIsLiked(true);
                                localStorage.setItem("love-count", newCount.toString());
                            }}
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
                                border: `1px solid ${isLiked ? (isDark ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.3)') : (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)')}`,
                                borderRadius: '10px',
                                color: isLiked ? '#2563eb' : (isDark ? '#94a3b8' : '#64748b'),
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                boxShadow: isLiked ? '0 2px 10px rgba(37, 99, 235, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Flame
                                size={16}
                                color={isLiked ? "#2563eb" : (isDark ? "#94a3b8" : "#64748b")}
                                fill={isLiked ? "#2563eb" : "none"}
                            />
                            {displayCount}
                        </motion.button>
                    </motion.div>

                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5" fill="currentColor" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="moon-icon"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </motion.div>
        </header>
    );
}
