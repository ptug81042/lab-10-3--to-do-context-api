import React, { createContext, useContext, useState } from "react"
import { type Filter } from "../types"

interface FilterContextType {
    filter: Filter;
    setFilter: (filter: Filter) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilterContext must be used within a FilterProvider')
    }
    return context;
}

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [filter, setFilter] = useState<Filter>('all')

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    )
}