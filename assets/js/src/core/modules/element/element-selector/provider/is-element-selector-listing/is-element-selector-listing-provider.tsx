import React, { createContext, useMemo } from "react"

export interface IsElementSelectorContextProps {
  isElementSelector: boolean
}

export const IsElementSelectorContext = createContext<IsElementSelectorContextProps>({
  isElementSelector: false
})

export interface IsElementSelectorListingProviderProps {
  children: React.ReactNode
}

export const IsElementSelectorListingProvider = ({ children }: IsElementSelectorListingProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <IsElementSelectorContext.Provider value={ { isElementSelector: true } }>
      { children }
    </IsElementSelectorContext.Provider>
  ), [children]);
}
