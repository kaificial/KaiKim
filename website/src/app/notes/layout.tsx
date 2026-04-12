import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Notes',
    description: "Notes and interests by Kai Kim — software engineer at Queen's University.",
    alternates: { canonical: 'https://kaikim.ca/notes' },
    openGraph: {
        title: 'Notes | Kai Kim',
        description: "Notes and interests by Kai Kim — software engineer at Queen's University.",
        url: 'https://kaikim.ca/notes',
        type: 'website',
    },
}

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
