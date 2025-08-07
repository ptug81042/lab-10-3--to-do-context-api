import React from "react"
import AppProviders from "./contexts/AppProviders"
import TodoInput from "./components/TodoInput/TodoInput"
import TodoList from "./components/TodoList/TodoList"
import FilterButtons from "./components/FilterButtons/FilterButtons"
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton"
import './App.css'

const App: React.FC = () => {
  return (
    <AppProviders>
      <div className="app-container">
        <header className="app-head">
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