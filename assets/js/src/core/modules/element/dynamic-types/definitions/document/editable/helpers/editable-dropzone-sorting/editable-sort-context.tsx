/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  MeasuringStrategy,
  pointerWithin,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core'
import { ToolstripDragOverlay } from './components/toolstrip-drag-overlay/toolstrip-drag-overlay'

// Dropzones don't move during a drag, so we skip dnd-kit's per-tick re-measure.
const MEASURING_CONFIG = {
  droppable: { strategy: MeasuringStrategy.BeforeDragging }
}

export interface EditableSortContextProps {
  children: React.ReactNode
  // Unused; kept for backwards-API compat (SortableContext was removed).
  items: string[]
  activeId: string | null
  dragOverlayTitle?: string
  onDragEnd: (event: DragEndEvent) => void
  onDragOver: (event: DragOverEvent) => void
  onDragStart: (event: DragStartEvent) => void
}

export const EditableSortContext = ({
  children,
  activeId,
  dragOverlayTitle,
  onDragEnd,
  onDragOver,
  onDragStart
}: EditableSortContextProps): React.JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  )

  return (
    <DndContext
      collisionDetection={ pointerWithin }
      measuring={ MEASURING_CONFIG }
      onDragEnd={ onDragEnd }
      onDragOver={ onDragOver }
      onDragStart={ onDragStart }
      sensors={ sensors }
    >
      {children}
      <ToolstripDragOverlay
        activeId={ activeId }
        title={ dragOverlayTitle }
      />
    </DndContext>
  )
}
