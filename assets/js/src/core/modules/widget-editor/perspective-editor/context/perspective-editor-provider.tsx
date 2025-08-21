import { PerspectiveConfig, usePerspectiveGetConfigCollectionQuery } from "@Pimcore/modules/perspectives/perspectives-slice.gen"
import React, { createContext, useMemo, useState } from "react"

interface PerspectiveEditorProviderProps {
  children?: React.ReactNode
}

export interface PerspectiveEditorContext {
  userId: number | null
  perspectives: PerspectiveConfig[]
}

export const PerspectiveEditorContext = createContext<PerspectiveEditorContext | undefined>(undefined)

export const PerspectiveEditorProvider = ({ children }: PerspectiveEditorProviderProps): React.JSX.Element => {
  const [userId, setUserId] = useState<number | null>(null)
  const { data } = usePerspectiveGetConfigCollectionQuery()

  const contextValue: PerspectiveEditorContext = useMemo(() => ({
    userId,
    setUserId,
    perspectives: data?.items || [],
  }), [userId, data])

  return (
    <PerspectiveEditorContext.Provider value={contextValue}>
      {children}
    </PerspectiveEditorContext.Provider>
  )
}