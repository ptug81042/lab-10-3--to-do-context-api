// Generic helpers to save/load data to/from localStorage

// Saves any serializable value under a key in localStorage
export const saveToStorage = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error('Error saving to localStorage', error);        
    }
}

// Loads and parses JSON from localStorage or returns fallback value
export const getFromStorage = <T>(key: string, fallback: T): T => {
    try {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : fallback
    } catch (error) {
        console.error('Error reading from localStorage', error)
        return fallback
    }
}