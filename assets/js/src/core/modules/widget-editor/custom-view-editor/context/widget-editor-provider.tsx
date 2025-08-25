import { WidgetConfig } from "@Pimcore/modules/perspectives/perspectives-slice.gen"
import React, { createContext, useMemo, useState } from "react"

interface WidgetEditorProviderProps {
  children?: React.ReactNode
}

export interface WidgetEditorContext {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
  widgets: WidgetConfig[]
  openWidget: (id: string) => Promise<void>
}

export const WidgetEditorContext = createContext<WidgetEditorContext | undefined>(undefined)

export const WidgetEditorProvider = ({ children }: WidgetEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [widgets, setWidgets] = useState<WidgetConfig[]>([])

  const openWidget = async (id: string): Promise<void> => {

  }

  const contextValue = useMemo(() => ({
    activeTabId,
    setActiveTabId,
    widgets,
    openWidget
  }), [activeTabId, widgets])

  return (
    <WidgetEditorContext.Provider value={contextValue}>
      {children}
    </WidgetEditorContext.Provider>
  )
}