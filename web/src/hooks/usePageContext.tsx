// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere

import React, { useContext } from 'react'

import type { PageContext } from '@/types/ssr'

const Context = React.createContext<PageContext | undefined>(undefined)

export const PageContextProvider = ({
  pageContext,
  children
}: {
  pageContext: PageContext
  children: React.ReactNode
}) => {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

export const usePageContext = () => {
  const pageContext = useContext(Context)
  return pageContext
}
