import React, { createContext, useMemo } from "react"

interface WidgetEditorContextProps {
  id: number
}

interface WidgetEditorContainerProps extends WidgetEditorContextProps {
  children?: React.ReactNode
}

export const WidgetEditorContext = createContext<WidgetEditorContextProps | undefined>(undefined)

export const WidgetEditorContainer = ({ id, children }: WidgetEditorContainerProps): React.JSX.Element => {
  return useMemo(() => (
    <WidgetEditorContext.Provider value={{ id }}>
      {children}
    </WidgetEditorContext.Provider>
  ), [id])
}