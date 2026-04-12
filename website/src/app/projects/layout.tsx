import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Software projects by Kai Kim — Clairo (AI medical assistant), Rooke (chess AI with 3D visualization), and Scribe (handwritten LaTeX converter).',
    alternates: { canonical: 'https://kaikim.ca/projects' },
    openGraph: {
        title: 'Projects | Kai Kim',
        description: 'Software projects by Kai Kim — Clairo, Rooke, and Scribe.',
        url: 'https://kaikim.ca/projects',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Kai Kim',
        description: 'Software projects by Kai Kim — Clairo, Rooke, and Scribe.',
    },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
