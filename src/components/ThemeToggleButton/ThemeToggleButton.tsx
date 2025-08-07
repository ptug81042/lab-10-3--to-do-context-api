import React from 'react'
import { useThemeContext } from '../../contexts/ThemeContext'
import styles from './ThemeToggleButton.module.css'

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <button
            className={styles.toggleButton}
            onClick={toggleTheme}
            aria-label='Toggle light/dark theme'
        >
            {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
    )
}

export default ThemeToggleButton