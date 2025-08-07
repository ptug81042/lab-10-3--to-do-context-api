# ToDo App — React + TypeScript + Vite + Context API

## Live Demo on Netlify

[**View the live demo here (placeholder)**](https://your-netlify-demo-link.netlify.app)

---

## Project Overview

This is a ToDo application built with **React**, **TypeScript**, and **Vite**. It uses the **Context API** for state management to handle todos, filters, and theme switching. The app supports:

- Adding, editing, toggling, and deleting todos
- Filtering todos by all, active, or completed status
- Light and dark theme toggling with persistence
- State persistence via localStorage for todos and theme preference

---

## Setup (High Level)

1. **Ensure Node.js and npm/yarn are installed**  
2. **Create the project using Vite with React + TypeScript template**  
3. **Install dependencies**  
4. **Run the development server**  
5. **Open the app in your browser at `http://localhost:3000`**

---

## Usage Guide

- **Add Todo:** Type your task in the input field and press **Add** or Enter key to add a new todo item.  
- **Toggle Completion:** Click the checkbox next to a todo to mark it completed or active.  
- **Edit Todo:** Double-click the todo text or click the pencil icon to edit; press Enter or click outside the input to save changes. Press Escape to cancel editing.  
- **Delete Todo:** Click the trash icon to remove the todo item permanently.  
- **Filter Todos:** Use the filter buttons (**All**, **Active**, **Completed**) below the list to control which todos are displayed.  
- **Theme Switch:** Use the theme toggle button in the header to switch between light and dark themes. Your choice will be saved and remembered on next visits.  

---

## Project Reflection

This project highlights effective use of React’s Context API combined with TypeScript for robust and scalable state management. The use of `useReducer` for todo operations ensures clear and maintainable updates, while `useState` handles simpler UI states such as filters and themes.

Component modularization and CSS Modules promote reusable, scoped styles and a clean separation of concerns. Persisting state in localStorage improves user experience by preserving data across sessions.

The theme toggle implementation demonstrates UI responsiveness and accessibility with smooth transitions. The project also showcases how to optimize React context usage with memoization hooks (`useMemo` and `useCallback`) to prevent unnecessary re-renders, essential for larger or more complex apps.

Overall, this project reflects a well-structured React + TypeScript approach suitable for production-level Todo applications or similar CRUD-based projects.