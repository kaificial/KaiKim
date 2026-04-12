import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Writing',
    description: "kai kim · notes and interests — media reviews, music, technical writing. CS @ Queen's University.",
    alternates: { canonical: 'https://kaikim.ca/writing' },
    openGraph: {
        title: 'Writing | Kai Kim',
        description: "kai kim · notes and interests — media reviews, music, technical writing.",
        url: 'https://kaikim.ca/writing',
        type: 'website',
        siteName: 'Kai Kim',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Writing | Kai Kim',
        description: "kai kim · notes and interests — media reviews, music, technical writing.",
    },
}

export default function WritingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
