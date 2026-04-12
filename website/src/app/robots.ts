import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
        ],
        sitemap: 'https://kaikim.ca/sitemap.xml',
        host: 'https://kaikim.ca',
    }
}
