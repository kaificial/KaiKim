"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

export interface Track {
    id: string;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface AudioContextType {
    currentTrack: Track;
    isPlaying: boolean;
    progress: number;
    duration: number;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    seek: (time: number) => void;
}

const DEFAULT_TRACK: Track = {
    id: "eta-newjeans",
    title: "ETA",
    artist: "NewJeans",
    src: "/music/newjean.mp3",
    cover: "/assets/music.jpg",
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTrack, setCurrentTrack] = useState<Track>(DEFAULT_TRACK);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    // Create the audio element once on mount
    useEffect(() => {
        const audio = new Audio(DEFAULT_TRACK.src);
        audio.preload = "metadata";
        audioRef.current = audio;

        const onTimeUpdate = () => setProgress(audio.currentTime);
        const onLoadedMetadata = () => {
            if (isFinite(audio.duration)) setDuration(audio.duration);
        };
        const onDurationChange = () => {
            if (audio.duration > 0 && isFinite(audio.duration)) setDuration(audio.duration);
        };
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("durationchange", onDurationChange);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("durationchange", onDurationChange);
            audio.removeEventListener("ended", onEnded);
            audio.pause();
            audio.src = "";
        };
    }, []);

    const playTrack = useCallback((track: Track) => {
        const audio = audioRef.current;
        if (!audio) return;

        // If it's the same track, just toggle
        if (track.id === currentTrack.id && audio.src.includes(track.src.split("/").pop() || "")) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().catch((e) => console.error("Audio play error", e));
                setIsPlaying(true);
            }
            return;
        }

        // Different track — switch source
        setCurrentTrack(track);
        setProgress(0);
        setDuration(0);
        audio.src = track.src;
        audio.load();
        audio.play().catch((e) => console.error("Audio play error", e));
        setIsPlaying(true);
    }, [currentTrack.id, isPlaying]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch((e) => console.error("Audio play error", e));
            setIsPlaying(true);
        }
    }, [isPlaying]);

    const seek = useCallback((time: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = time;
        setProgress(time);
    }, []);

    return (
        <AudioContext.Provider
            value={{
                currentTrack,
                isPlaying,
                progress,
                duration,
                playTrack,
                togglePlay,
                seek,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
