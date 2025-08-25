import { PerspectiveConfig, PerspectiveConfigDetail, usePerspectiveGetConfigCollectionQuery } from "@Pimcore/modules/perspectives/perspectives-slice.gen"
import { isNil } from "lodash"
import React, { createContext, useMemo, useState } from "react"
import { usePerspectiveEditor } from "../hooks/use-perspective-editor"

interface PerspectiveEditorProviderProps {
  children?: React.ReactNode
}

export interface PerspectiveEditorContext {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
  perspectives: PerspectiveConfigDetail[]
  openPerspective: (id: string) => Promise<void>
}

export const PerspectiveEditorContext = createContext<PerspectiveEditorContext | undefined>(undefined)

export const PerspectiveEditorProvider = ({ children }: PerspectiveEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [perspectives, setPerspectives] = useState<PerspectiveConfigDetail[]>([])
  const { getPerspectiveById } = usePerspectiveEditor()

  const openPerspective = async (id: string): Promise<void> => {
    const perspective = await getPerspectiveById(id)

    if (!isNil(perspective)) {
      setPerspectives((prev) => {
        const existingIndex = prev.findIndex(p => p.id === perspective.id)
        if (existingIndex >= 0) {
          // Perspective already exists, just activate it
          setActiveTabId(perspective.id)
          return prev
        } else {
          // Add new perspective and activate it
          setActiveTabId(perspective.id)
          return [
            ...prev,
            perspective
          ]
        }
      })
    }
  }

  const contextValue: PerspectiveEditorContext = useMemo(() => ({
    activeTabId,
    setActiveTabId,
    perspectives,
    openPerspective
  }), [activeTabId, perspectives])

  return (
    <PerspectiveEditorContext.Provider value={contextValue}>
      {children}
    </PerspectiveEditorContext.Provider>
  )
}
