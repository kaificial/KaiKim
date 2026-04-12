import type { Metadata } from 'next'
import { projects } from '../../../data/projects'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const project = projects.find(p => p.id === id)
    if (!project) return { title: 'Project Not Found' }
    return {
        title: project.title,
        description: project.description,
        alternates: { canonical: `https://kaikim.ca/projects/${project.id}` },
        openGraph: {
            title: `${project.title} — Kai Kim`,
            description: project.description,
            url: `https://kaikim.ca/projects/${project.id}`,
            type: 'article',
            authors: ['Kai Kim'],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} — Kai Kim`,
            description: project.description,
        },
    }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
