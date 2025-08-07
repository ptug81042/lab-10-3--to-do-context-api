import React, { createContext, useContext, useEffect, useState } from "react";
import { type Theme } from "../types"; // Theme is expected to be 'light' | 'dark'
import { getFromStorage, saveToStorage } from "../utils/localStorage"; // Helpers for localStorage

// Define the shape of the context data: current theme and a toggle function
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context with initial undefined to enforce usage within Provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to access ThemeContext safely
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

// ThemeProvider component to wrap parts of app needing theme state
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize theme state with lazy initializer from localStorage or fallback to 'light'
  const [theme, setTheme] = useState<Theme>(() =>
    getFromStorage("theme", "light")
  );

  // On theme change, sync new theme to localStorage and update document body class
  useEffect(() => {
    saveToStorage("theme", theme);
    document.body.className = theme; // optional: allows global CSS based on body class
  }, [theme]);

  // Function to toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Provide the theme value and toggler to descendant components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};