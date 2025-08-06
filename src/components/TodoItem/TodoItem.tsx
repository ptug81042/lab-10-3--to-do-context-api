import React, { useState, useCallback } from "react"
import styles from './TodoItem.module.css'
import { type Todo } from "../../types"
import { useTodoContext } from "../../contexts/TodoContext"

interface TodoItemProps {
    todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    // Grab actions from context
    const { toggleTodo, deleteTodo, editTodo } = useTodoContext()

    // Local state for editing text
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    // Toggle completed status
    const handleToggle = useCallback(() => {
        toggleTodo(todo.id)
    }, [todo.id, toggleTodo])

    // Delete todo
    const handleDelete = useCallback(() => {
        deleteTodo(todo.id)
    }, [todo.id, deleteTodo])

    // Handle entering edit mode
    const startEditing = () => {
        setIsEditing(true)
        setEditText(todo.text)
    }

    // Handle cancel editing
    const cancelEditing = () => {
        setIsEditing(false);
        setEditText(todo.text)
    }

    // Save edited text
    const saveEdit = () => {
        const trimmed = editText.trim();
        if (trimmed && trimmed !== todo.text) {
            editTodo(todo.id, trimmed)
        }
        setIsEditing(false)
    }

    // Handle enter key or blur on input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    }

    return (
        <li className={styles.TodoItem}>
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
            />

            {isEditing ? (
                <input 
                    className={styles.editInput}
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={startEditing}
                    className={todo.completed ? styles.completed : ''}
                >
                    {todo.text}
                </span>
            )}

            <button onClick={handleDelete} className={styles.deleteButton} aria-label="Delete todo">
                &times;
            </button>
        </li>
    )
}

export default TodoItem