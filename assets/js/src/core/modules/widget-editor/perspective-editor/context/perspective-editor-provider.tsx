/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PerspectiveConfigDetail } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { isNil } from 'lodash'
import React, { createContext, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { usePerspectiveEditor } from '../hooks/use-perspective-editor'

interface PerspectiveEditorProviderProps {
  children?: React.ReactNode
}

export interface PerspectiveEditorContextProps {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
  perspectives: PerspectiveConfigDetail[]
  setPerspectives: Dispatch<SetStateAction<PerspectiveConfigDetail[]>>
  openPerspective: (id: string) => Promise<void>
  closePerspective: (id: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const PerspectiveEditorContext = createContext<PerspectiveEditorContextProps | undefined>(undefined)

export const PerspectiveEditorProvider = ({ children }: PerspectiveEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [perspectives, setPerspectives] = useState<PerspectiveConfigDetail[]>([])
  const { getPerspectiveById } = usePerspectiveEditor()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const closePerspective = (id: string): void => {
    const updatedPerspectives = perspectives.filter(perspective => perspective.id !== id)
    setPerspectives(updatedPerspectives)

    if (activeTabId === id) {
      const remainingPerspectives = updatedPerspectives
      if (remainingPerspectives.length > 0) {
        setActiveTabId(remainingPerspectives[0].id)
      } else {
        setActiveTabId(undefined)
      }
    }
  }

  const contextValue: PerspectiveEditorContextProps = useMemo(() => ({
    activeTabId,
    setActiveTabId,
    perspectives,
    setPerspectives,
    openPerspective,
    closePerspective,
    isLoading,
    setIsLoading
  }), [activeTabId, perspectives, isLoading])

  return (
    <PerspectiveEditorContext.Provider value={ contextValue }>
      {children}
    </PerspectiveEditorContext.Provider>
  )
}
