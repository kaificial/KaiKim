"use client";

import useSound from 'use-sound';

export const useUISound = () => {
    const [playClick] = useSound('/sounds/click.mp3', { volume: 0.35 });
    const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.06 });
    const [playOn] = useSound('/sounds/on.mp3', { volume: 0.3 });
    const [playOff] = useSound('/sounds/off.mp3', { volume: 0.3 });

    return {
        playClick,
        playHover,
        playOn,
        playOff,
    };
};
