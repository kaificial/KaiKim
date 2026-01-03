
import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.scss";
import Header from "../components/Header";
import { ThemeProvider } from "../components/ThemeContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400"],
});

// site metadata for SEO and social sharing
// this shows up in browser tabs and when people share links
export const metadata: Metadata = {
    title: "Kai Kim",
    keywords: ["Kai Kim", "software developer", "portfolio", "web developer", "React", "Next.js"],
    authors: [{ name: "Kai Kim" }],
    icons: {
        icon: '/assets/newjeans.png',
    },
    openGraph: {
        title: "Kai Kim",
        description: "Hey! I'm Kai",
        type: "website",
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
                        __html: 
                            (function() {
                                // Check localStorage for saved theme preference
                                const savedTheme = localStorage.getItem('theme');
                                
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
                        ,
                    }}
                />
            </head>
            <body className={`${inter.variable} ${ibmPlexMono.variable}`}>
                <ThemeProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
