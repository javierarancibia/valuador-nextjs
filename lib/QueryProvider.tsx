'use client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const QueryProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [ queryClient ] = useState(() => new QueryClient())
  
  return <QueryClientProvider client={queryClient}>{ children }</QueryClientProvider>
}
