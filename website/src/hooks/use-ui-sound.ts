"use client";

import useSound from 'use-sound';

export const useUISound = () => {
    const [playClickRaw, { sound: clickSound }] = useSound('/assets/music/pickup_sound_effect.mp3', { volume: 0.35 });
    const [playHover] = useSound('/assets/music/drop_sound_effect.mp3', { volume: 0.06 });
    const [playOn] = useSound('/assets/music/drop_sound_effect.mp3', { volume: 0.3 });
    const [playOff] = useSound('/assets/music/drop_sound_effect.mp3', { volume: 0.3 });

    const playClick = () => {
        if (clickSound) {
            clickSound.seek(2);
        }
        playClickRaw();
    };

    return {
        playClick,
        playHover,
        playOn,
        playOff,
    };
};
