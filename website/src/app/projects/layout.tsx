import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'software projects by Kai Kim — Clairo (AI medical assistant), Rooke (chess AI with 3D visualization), Scribe (handwritten LaTeX converter). made with TypeScript, React, Next.js, WebGL, and more.',
    alternates: { canonical: 'https://kaikim.ca/projects' },
    openGraph: {
        title: 'Projects | Kai Kim',
        description: 'software projects by Kai Kim — Clairo (AI medical assistant), Rooke (chess AI with 3D visualization), Scribe (handwritten LaTeX converter).',
        url: 'https://kaikim.ca/projects',
        type: 'website',
        siteName: 'Kai Kim',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Kai Kim',
        description: 'software projects by Kai Kim — Clairo (AI medical assistant), Rooke (chess AI with 3D visualization), Scribe (handwritten LaTeX converter).',
    },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
