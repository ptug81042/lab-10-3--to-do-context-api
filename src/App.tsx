import React from "react"
import { useThemeContext } from "./contexts/ThemeContext"
import TodoInput from "./components/TodoInput/TodoInput"
import TodoList from "./components/TodoList/TodoList"
import FilterButtons from "./components/FilterButtons/FilterButtons"
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton"
import styles from './App.module.css'

const App: React.FC = () => {
  const { theme } = useThemeContext()

  return (
    <div className={`${styles.appContainer} ${styles[theme]}`}>
      <header className={styles.title}>
        <h1>Todo App</h1>
        <ThemeToggleButton />
      </header>
      <main>
        <TodoInput />
        <TodoList />
        <FilterButtons />
      </main>
    </div>
  )
}

export default App