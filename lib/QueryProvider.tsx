'use client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const QueryProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [ queryClient ] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // React query function to avoid refetching when reopening browser's window 
      },
    }
  }))
  
  return <QueryClientProvider client={queryClient}>{ children }</QueryClientProvider>
}
