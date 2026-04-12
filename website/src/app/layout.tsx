
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "../styles/globals.scss";
import "katex/dist/katex.min.css";
import Header from "../components/Header";
import { ThemeProvider } from "../components/ThemeContext";
import ScrollToTop from "../components/ScrollToTop";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400", "500", "600"],
});

const sourceSerif = Source_Serif_4({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: ["400", "600", "700"],
});

// site metadata for SEO and social sharing
// this shows up in browser tabs and when people share links
export const metadata: Metadata = {
    metadataBase: new URL('https://kaikim.ca'),
    title: {
        template: '%s | Kai Kim',
        default: 'Kai Kim — Software Engineer',
    },
    description: "Kai Kim — SWE and CS student at Queen's University. Based in Toronto.",
    keywords: [
        "Kai Kim",
        "Kai Kim engineer",
        "Kai Kim software engineer",
        "Kai Kim Queen's University",
        "Kai Kim developer",
        "Kai Kim portfolio",
        "Queen's University computer science",
        "software engineer Toronto",
    ],
    authors: [{ name: "Kai Kim", url: "https://kaikim.ca" }],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: 'https://kaikim.ca' },
    icons: {
        icon: '/assets/newjeans.png',
    },
    openGraph: {
        title: 'Kai Kim — Software Engineer',
        description: "CS student at Queen's University. Builder of Clairo, Rooke, and Scribe.",
        type: 'website',
        url: 'https://kaikim.ca',
        siteName: 'Kai Kim',
        locale: 'en_CA',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Kai Kim — Software Engineer' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kai Kim — Software Engineer',
        description: "CS student at Queen's University. Builder of Clairo, Rooke, and Scribe.",
        images: ['/og-image.png'],
    },
};

/*
 * Main layout component
 * 
 * The script checks localStorage first, then uses the users system preference
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                // Check localStorage for saved theme preference
                                var savedTheme = localStorage.getItem('theme');

                                if (savedTheme) {
                                    // Use saved preference
                                    if (savedTheme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } else {
                                    // First visit - check system preference
                                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                        document.documentElement.classList.add('dark');
                                    }
                                }
                            })();
                        `,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Kai Kim",
                            "url": "https://kaikim.ca",
                            "jobTitle": "Software Engineer",
                            "description": "Software engineering student at Queen's University. Builder of Clairo, Rooke, and Scribe.",
                            "alumniOf": {
                                "@type": "CollegeOrUniversity",
                                "name": "Queen's University",
                                "url": "https://www.queensu.ca"
                            },
                            "knowsAbout": ["TypeScript", "React", "Next.js", "Machine Learning", "WebGL", "Three.js"],
                            "sameAs": ["https://github.com/kaificial", "https://kaikim.ca"]
                        })
                    }}
                />
            </head>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable}`}>
                <ThemeProvider>
                    <ScrollToTop />
                    <Header />
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
