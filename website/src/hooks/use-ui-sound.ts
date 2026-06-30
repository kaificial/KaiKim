"use client";

import useSound from 'use-sound';

export const useUISound = () => {
    const [playClick] = useSound('/sounds/sound-2.mp3', { volume: 0.35 });
    const [playOn] = useSound('/assets/music/drop_sound_effect.mp3', { volume: 0.3 });
    const [playOff] = useSound('/assets/music/drop_sound_effect.mp3', { volume: 0.3 });

    return {
        playClick,
        playOn,
        playOff,
    };
};
