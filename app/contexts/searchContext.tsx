'use client'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type SearchContext = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}
export const SearchContext = createContext<SearchContext | null>(null);

export default function SearchContextProvider({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearchContext() {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error(
            'useSearchContext must be used within a SearchContextProvider'
        )
    }
    return context
}