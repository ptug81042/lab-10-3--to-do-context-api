import React, { useState, useCallback } from "react"
import styles from './TodoInput.module.css'
import { useTodoContext } from "../../contexts/TodoContext"

// Input form to add new todos
const TodoInput: React.FC = () => {
    // Grab addTodo action from context
    const { addTodo } = useTodoContext()
    // Local state for input text
    const [text, setText] = useState('')

    // Handle form submission
    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault() // Prevent page reload
            const trimmed = text.trim();
            if (!trimmed) return // ignore empty input
            addTodo(trimmed) // Add todo via context action
            setText('') // Clear input after submit
        },
        [text, addTodo]
    )

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
                type="text"
                placeholder="What needs to be done?"
                value={text}
                onChange={e => setText(e.target.value)}
                className={styles.input}
            />

            <button type="submit" className={styles.button}>
                Add
            </button>
        </form>
    )
}

export default TodoInput