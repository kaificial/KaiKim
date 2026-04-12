import { MetadataRoute } from 'next'
import { projects } from '../data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://kaikim.ca'
    return [
        { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
        { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
        ...projects.map(p => ({
            url: `${base}/projects/${p.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ]
}
