/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'

export interface UseSortableElementProps {
  id: string
  element: HTMLElement
}

export interface UseSortableElementReturn {
  listeners: {
    onMouseDown?: React.MouseEventHandler
    onTouchStart?: React.TouchEventHandler
  }
  DraggableWrapper: React.ComponentType<{ children: React.ReactNode }>
}

/**
 * Custom hook to handle sortable element setup for both block and areablock toolbars.
 * Uses native browser drag/drop with Draggable component instead of @dnd-kit.
 */
export const useSortableElement = ({
  id,
  element
}: UseSortableElementProps): UseSortableElementReturn => {

  // Create drag info for internal sorting
  const dragInfo: DragAndDropInfo = useMemo(() => ({
    type: 'areablock-element', // or 'block-element' depending on context
    title: element.getAttribute('data-type') ?? 'Element',
    icon: { value: 'move' },
    data: {},
    sortable: {
      elementKey: id,
      originalElement: element
    }
  }), [id, element])

  // Create a wrapper component that handles dragging
  const DraggableWrapper = useCallback(({ children }: { children: React.ReactNode }) => (
    <Draggable info={dragInfo}>
      {children}
    </Draggable>
  ), [dragInfo])

  // Simple listeners for compatibility (not really needed with native implementation)
  const listeners = useMemo(() => ({
    onMouseDown: undefined,
    onTouchStart: undefined
  }), [])

  return {
    listeners,
    DraggableWrapper
  }
}
