import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Notes',
    description: "kai kim · notes and interests — media reviews, music, technical writing. CS @ Queen's University.",
    alternates: { canonical: 'https://kaikim.ca/writing' },
    openGraph: {
        title: 'Notes | Kai Kim',
        description: "kai kim · notes and interests — media reviews, music, technical writing.",
        url: 'https://kaikim.ca/writing',
        type: 'website',
        siteName: 'Kai Kim',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Notes | Kai Kim',
        description: "kai kim · notes and interests — media reviews, music, technical writing.",
    },
}

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
