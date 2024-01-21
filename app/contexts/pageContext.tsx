'use client'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type PageContext = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>
}
export const PageContext = createContext<PageContext | null>(null);

export default function PageContextProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(0);

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
}

export function usePageContext() {
    const context = useContext(PageContext)
    if (!context) {
        throw new Error(
            'usePageContext must be used within a PageContextProvider'
        )
    }
    return context
}