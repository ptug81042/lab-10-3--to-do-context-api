// src/components/TodoItem/TodoItem.tsx
import React, { useState, useEffect, useRef } from 'react';
import { type Todo } from '../../types/index';
import { useTodoContext } from '../../contexts/TodoContext';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();

  // Local state to manage edit mode and input value
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // Ref to focus input when editing
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Handle text change in input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  // Commit edit on blur or Enter
  const handleSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed.length > 0 && trimmed !== todo.text) {
      editTodo(todo.id, trimmed); // Call context function to update
    }
    setIsEditing(false); // Exit edit mode
  };

  // Submit on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text); // Reset value if user cancels
      setIsEditing(false);
    }
  };

  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`Toggle ${todo.text}`}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editText}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          aria-label="Edit todo text"
        />
      ) : (
        <span
          className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        <button onClick={() => setIsEditing(true)} aria-label="Edit Todo">
          ✏️
        </button>
        <button onClick={() => deleteTodo(todo.id)} aria-label="Delete Todo">
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;