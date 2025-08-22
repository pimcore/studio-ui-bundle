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
  pointerWithin,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core'
import { ToolstripDragOverlay } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/helpers/editable-dropzone-sorting/components/toolstrip-drag-overlay/toolstrip-drag-overlay'

export interface DocumentEditDndContextProps {
  children: React.ReactNode
  activeId: string | null
  dragOverlayTitle?: string
  onDragEnd: (event: DragEndEvent) => void
  onDragOver: (event: DragOverEvent) => void
  onDragStart: (event: DragStartEvent) => void
}

export const DocumentEditDndContext = ({
  children,
  activeId,
  dragOverlayTitle,
  onDragEnd,
  onDragOver,
  onDragStart
}: DocumentEditDndContextProps): React.JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor)
  )

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      sensors={sensors}
    >
      {children}
      <ToolstripDragOverlay
        activeId={activeId}
        title={dragOverlayTitle}
      />
    </DndContext>
  )
}
