import React, { createContext, useContext, useMemo } from "react"

export interface IInlineHelpContext {
  component: React.JSX.Element | null
  setComponent: (component: React.JSX.Element) => void
}

export const InlineHelpContext = createContext<IInlineHelpContext | undefined>(undefined)

export interface InlineHelpProviderProps {
  children: React.ReactNode
}

export const InlineHelpProvider = ({ children }: InlineHelpProviderProps): React.JSX.Element => {
  const [component, setComponent] = React.useState<IInlineHelpContext['component']>(null)

  return useMemo(() => (
    <InlineHelpContext.Provider value={{ component, setComponent }}>
      {children}
    </InlineHelpContext.Provider>
  ), [children, component]);
}

export interface UseInlineHelpReturn extends IInlineHelpContext {}

export const useInlineHelp = (): UseInlineHelpReturn => {
  const context = useContext(InlineHelpContext)
  if (!context) {
    throw new Error("useInlineHelp must be used within an InlineHelpProvider")
  }
  return context
}
