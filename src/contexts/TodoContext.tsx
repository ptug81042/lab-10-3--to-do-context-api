import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from 'react'

import { type Todo } from '../types'
import { getFromStorage, saveToStorage } from '../utils/localStorage'

// Action types for reducer
type Action =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: string }
    | { type: 'DELETE_TODO'; id: string }
    | { type: 'EDIT_TODO'; payload: { id: string; newText: string } }
    | { type: 'CLEAR_COMPLETED' }

// Reducer function handling todo state transitions
function todoReducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { id: crypto.randomUUID(), text: action.text, completed: false },
            ];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'EDIT_TODO':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.newText }
                    : todo
            );
        case 'CLEAR_COMPLETED':
            return state.filter(todo => !todo.completed);
        default:
            return state;
    }
}

// Context shape with todos and action dispatchers
interface TodoContextType {
    todos: Todo[]
    addTodo: (text: string) => void
    toggleTodo: (id: string) => void
    deleteTodo: (id: string) => void
    editTodo: (id: string, newText: string) => void
    clearCompleted: () => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Hook to consume TodoContext easily
export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext)
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider')
    }
    return context
}

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Initialize state from localStorage or empty array
    const [todos, dispatch] = useReducer(
        todoReducer,
        [],
        () => getFromStorage<Todo[]>('todos', [])
    )

    // Persist todos to localStorage on every change
    useEffect(() => {
        saveToStorage('todos', todos)
    }, [todos])

    // Memoized action dispatchers for performance
    const addTodo = useCallback((text: string) => {
        dispatch({ type: 'ADD_TODO', text })
    }, [])

    const toggleTodo = useCallback((id: string) => {
        dispatch({ type: 'TOGGLE_TODO', id })
    }, [])

    const deleteTodo = useCallback((id: string) => {
        dispatch({ type: 'DELETE_TODO', id })
    }, [])

    const editTodo = useCallback((id: string, newText: string) => {
        dispatch({ type: 'EDIT_TODO', payload: { id, newText } })
    }, [])

    const clearCompleted = useCallback(() => {
        dispatch({ type: 'CLEAR_COMPLETED' })
    }, [])

    // Memoize context value to avoid unnecessary re-renders
    const value = useMemo(
        () => ({
            todos,
            addTodo,
            toggleTodo,
            deleteTodo,
            editTodo,
            clearCompleted,
        }),
        [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted]
    )

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}