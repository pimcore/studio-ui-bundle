/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback } from 'react'
import { type DragEndEvent, type DragOverEvent, type DragStartEvent } from '@dnd-kit/core'

export interface UseDocumentEditDndReturn {
  activeId: string | null
  dragOverlayTitle: string | undefined
  handleDragStart: (event: DragStartEvent) => void
  handleDragOver: (event: DragOverEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
}

export const useDocumentEditDnd = (): UseDocumentEditDndReturn => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dragOverlayTitle, setDragOverlayTitle] = useState<string | undefined>(undefined)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activeId = String(event.active.id)
    setActiveId(activeId)

    // Set drag overlay title based on the type of item being dragged
    if (activeId.startsWith('sidebar-areablock-')) {
      const dragData = event.active.data.current
      if (dragData?.type === 'areablock-type') {
        setDragOverlayTitle(dragData.areablockType)
      }
    }
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // Let individual areablocks handle their own drag over logic
    // This is mainly for coordination between sidebar and areablocks
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null)
    setDragOverlayTitle(undefined)

    // If this is a sidebar item being dropped, the individual areablock
    // dropzone handling will take care of the actual adding logic
  }, [])

  return {
    activeId,
    dragOverlayTitle,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }
}
