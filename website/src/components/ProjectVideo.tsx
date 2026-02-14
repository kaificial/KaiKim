"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectVideoProps {
    src: string;
    style?: React.CSSProperties;
    className?: string;
    resetTime?: number;
    iconColor?: 'white' | 'black';
}

export const ProjectVideo = ({ src, style, className, resetTime = 0, iconColor = 'black' }: ProjectVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [iconState, setIconState] = useState<'play' | 'pause' | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!videoRef.current) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (videoRef.current.paused) {
            // Play checks
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error("Video play prevented:", error);
                });
            }
            setIconState(null);
        } else {
            // Pause checks
            videoRef.current.pause();
            videoRef.current.currentTime = resetTime;
            // Show play icon to and keep it visible
            setIconState('play');
        }
    };

    const iconBgClass = iconColor === 'white'
        ? "bg-zinc-900/90 text-white"
        : "bg-white/90 text-black";

    return (
        <div
            className={`relative w-full h-full cursor-pointer overflow-hidden bg-black flex items-center justify-center ${className || ''}`}
            onClick={handleClick}
            style={{
                // container takes up the space
                // transforms) to the whole container
                ...style
            }}
        >
            <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none" // 
            />

            <AnimatePresence>
                {iconState && (
                    <motion.div
                        key={iconState}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className={`${iconBgClass} rounded-full p-5 backdrop-blur-md shadow-xl`}>
                            {iconState === 'pause' ? (
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill={iconColor === 'white' ? 'white' : 'black'}
                                    stroke={iconColor === 'white' ? 'white' : 'black'}
                                    strokeWidth="0"
                                >
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill={iconColor === 'white' ? 'white' : 'black'}
                                    stroke={iconColor === 'white' ? 'white' : 'black'}
                                    strokeWidth="0"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
