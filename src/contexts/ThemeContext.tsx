import React, { createContext, useContext, useEffect, useState } from "react"
import { type Theme } from "../types"
import { getFromStorage, saveToStorage } from "../utils/localStorage"

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Initialize theme from localStorage or default to light
    const [theme, setTheme] = useState<Theme>(() => getFromStorage('theme', 'light'))

    // Sync theme to localStorage and apply to document body class
    useEffect(() => {
        saveToStorage('theme', theme);
        document.body.className = theme;
    }, [theme])

    // Toggles between 'light' and 'dark' themes
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}