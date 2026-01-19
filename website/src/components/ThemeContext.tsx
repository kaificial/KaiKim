"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if user has a saved preference
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            // User chose a theme before - use that
            const prefersDark = savedTheme === "dark";
            setIsDark(prefersDark);
            document.documentElement.classList.toggle("dark", prefersDark);
        } else {
            // Default to light mode for everyone on load
            setIsDark(false);
            document.documentElement.classList.remove("dark");
            // Save the preference
            localStorage.setItem("theme", "light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        // Update the DOM
        document.documentElement.classList.toggle("dark", newTheme);

        //localStorage
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
