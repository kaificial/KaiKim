"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { useTheme } from "./ThemeContext";

interface ProjectDescriptionProps {
    content: string;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ content }) => {
    const { isDark } = useTheme();

    return (
        <div style={{
            fontSize: '0.875rem',
            lineHeight: '1.7',
            color: isDark ? '#d1d5db' : '#4b5563',
            marginBottom: '16px'
        }}>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={{
                    p: ({ node, ...props }) => <p style={{ marginBottom: '24px' }} {...props} />,
                    h3: ({ node, ...props }) => (
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            marginTop: '32px',
                            marginBottom: '16px',
                            color: isDark ? 'white' : '#1c1917',
                            letterSpacing: '-0.02em',
                            textTransform: 'lowercase'
                        }} {...props} />
                    ),
                    strong: ({ node, ...props }) => <strong style={{ fontWeight: '600', color: isDark ? 'white' : '#111827' }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ marginLeft: '1.5rem', marginBottom: '16px', listStyleType: 'disc' }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ marginBottom: '8px' }} {...props} />,
                    code: ({ node, ...props }) => (
                        <code style={{
                            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8125rem'
                        }} {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
