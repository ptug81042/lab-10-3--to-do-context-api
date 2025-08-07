import React, { useMemo } from "react"
import { useTodoContext } from "../../contexts/TodoContext"
import { useFilterContext } from "../../contexts/FilterContext"
import TodoItem from "../TodoItem/TodoItem"
import styles from './TodoList.module.css'

const TodoList: React.FC = () => {
    const { todos } = useTodoContext()
    const { filter } = useFilterContext()

    // Filter todos based on current filter
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'all':
            default:
                return todos;    
        }
    }, [todos, filter])

    if (filteredTodos.length === 0) {
        return <p className={styles.empty}>No todos to display.</p>;
    }

    return (
        <ul className={styles.todoList}>
            {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}

export default TodoList