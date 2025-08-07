import React, { useContext } from "react"
import AppProviders from "./contexts/AppProviders"
import TodoInput from "./components/TodoInput/TodoInput"
import TodoList from "./components/TodoList/TodoList"
import FilterButtons from "./components/FilterButtons/FilterButtons"
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton"
import styles from './App.module.css'
import { useThemeContext } from "./contexts/ThemeContext"

const App: React.FC = () => {
  const { theme } = useThemeContext()

  return (
    <AppProviders>
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
    </AppProviders>
  )
}

export default App