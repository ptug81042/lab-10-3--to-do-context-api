import React from "react"
import { ThemeProvider } from "./ThemeContext"
import { TodoProvider } from "./TodoContext"
import { FilterProvider } from './FilterContext'

// Wraps all context providers for simpler usage in App.tsx
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <TodoProvider>
                <FilterProvider>
                    {children}
                </FilterProvider>
            </TodoProvider>
        </ThemeProvider>
    )
}

export default AppProviders