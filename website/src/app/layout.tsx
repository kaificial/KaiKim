
import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "../styles/globals.scss";
import Header from "../components/Header";

// courier prime for that typewriter look
const courierPrime = Courier_Prime({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-courier",
});

// site metadata for SEO and social sharing
// this shows up in browser tabs and when people share links
export const metadata: Metadata = {
    title: "Kai Kim",
    keywords: ["Kai Kim", "software developer", "portfolio", "web developer", "React", "Next.js"],
    authors: [{ name: "Kai Kim" }],
    openGraph: {
        title: "Kai Kim",
        description: "Hey! I'm Kai",
        type: "website",
    },
};

/*
 * Main layout component
 * 
 * we're setting html to "dark" class by default since dark mode looks better imo
 * Users can toggle it if they like light mode
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={courierPrime.variable}>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
