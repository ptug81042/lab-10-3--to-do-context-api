// TypeScript interfaces and types used throughout the app

// Defines shape of a single todo item
export interface Todo {
    id: string; // Unique identifier for each todo
    text: string; // Use todo's text content
    completed: boolean; // Whether the todo is done or not
};

// Union type for filter options
export type Filter = 'all' | 'active' | 'completed';

// Union type for theme modes
export type Theme = 'light' | 'dark';