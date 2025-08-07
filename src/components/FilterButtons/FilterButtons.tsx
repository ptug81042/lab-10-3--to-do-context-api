import React from "react"
import { useFilterContext } from "../../contexts/FilterContext"
import styles from './FilterButtons.module.css'

const FilterButtons: React.FC = () => {
    const { filter, setFilter } = useFilterContext()

    // Button labels and filter keys
    const filters = ['all', 'active', 'completed'] as const;

    return (
        <div className={styles.filterButtons}>
            {filters.map(f => (
                <button
                    key={f}
                    className={`${styles.button} ${filter === f ? styles.active : ''}`}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default FilterButtons