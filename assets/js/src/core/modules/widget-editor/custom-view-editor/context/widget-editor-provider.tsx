/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import React, { createContext, useMemo, useState } from 'react'
import { useWidgetEditor } from '../hooks/use-widget-editor'

interface WidgetEditorProviderProps {
  children?: React.ReactNode
}

export interface WidgetEditorContextProps {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
  widgets: WidgetConfig[]
  openWidget: (id: string, type: string) => Promise<void>
  closeWidget: (id: string) => void
}

export const WidgetEditorContext = createContext<WidgetEditorContextProps | undefined>(undefined)

export const WidgetEditorProvider = ({ children }: WidgetEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [widgets, setWidgets] = useState<WidgetConfig[]>([])
  const { getWidgetById } = useWidgetEditor()

  const openWidget = async (id: string, type: string): Promise<void> => {
    const widget = await getWidgetById(id, type)

    if (widget !== undefined) {
      setWidgets((prev) => {
        const existingIndex = prev.findIndex(p => p.id === widget.id)
        if (existingIndex >= 0) {
          // Widget already exists, just activate it
          setActiveTabId(widget.id)
          return prev
        } else {
          // Add new widget and activate it
          setActiveTabId(widget.id)
          return [
            ...prev,
            widget
          ]
        }
      })
    }
  }

  const closeWidget = (id: string): void => {
    const updatedWidgets = widgets.filter(widget => widget.id !== id)
    setWidgets(updatedWidgets)

    if (activeTabId === id) {
      const remainingWidgets = updatedWidgets
      if (remainingWidgets.length > 0) {
        setActiveTabId(remainingWidgets[0].id)
      } else {
        setActiveTabId(undefined)
      }
    }
  }

  const contextValue = useMemo(() => ({
    activeTabId,
    setActiveTabId,
    widgets,
    openWidget,
    closeWidget
  }), [activeTabId, widgets])

  return (
    <WidgetEditorContext.Provider value={ contextValue }>
      {children}
    </WidgetEditorContext.Provider>
  )
}
