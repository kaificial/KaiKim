"use client";

import useSound from 'use-sound';

export const useUISound = () => {
    const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
    const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.1 }); // Lower volume for hover
    const [playOn] = useSound('/sounds/on.mp3', { volume: 0.5 });
    const [playOff] = useSound('/sounds/off.mp3', { volume: 0.5 });

    return {
        playClick,
        playHover,
        playOn,
        playOff,
    };
};
