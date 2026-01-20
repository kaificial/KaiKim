"use client";

import { motion } from 'framer-motion';
import { useTheme } from '../../components/ThemeContext';
import FloatingDock from '../../components/FloatingDock';

export default function WritingPage() {
    const { isDark } = useTheme();

    return (
        <div className="w-full">
            <div style={{
                width: '96%',
                maxWidth: '660px',
                margin: '0 auto',
                padding: '0 0 48px 0'
            }}>
                <section>
                    <header style={{ marginBottom: '64px' }}>
                        <motion.h1
                            className="hero-title font-bold text-gray-900 dark:text-white tracking-tight leading-none text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Writing
                        </motion.h1>
                        <motion.p
                            style={{
                                color: isDark ? '#9ca3af' : '#6b7280',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                letterSpacing: '0.15em',
                                maxWidth: '600px',
                                lineHeight: '1.6',
                                marginTop: '16px',
                                whiteSpace: 'normal',
                                opacity: 0.8
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 1.35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            My writing when I'm bored
                        </motion.p>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 1 }}
                        style={{
                            padding: '40px',
                            border: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            borderRadius: '12px',
                            textAlign: 'center',
                            color: isDark ? '#6b7280' : '#94a3b8'
                        }}
                    >
                    </motion.div>
                </section>
            </div>
            <FloatingDock />
        </div>
    );
}
