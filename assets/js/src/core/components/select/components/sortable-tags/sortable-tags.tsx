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
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, type DragEndEvent, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export interface SortableTagsProps {
  enabled: boolean
  value: unknown
  onChange?: (value: any, option: any) => void
  children: React.ReactNode
}

export const SortableTags = ({ enabled, value, onChange, children }: SortableTagsProps): React.JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    if (over === null || active.id === over.id || !Array.isArray(value)) {
      return
    }

    const oldIndex = value.findIndex((item) => String(item) === String(active.id))
    const newIndex = value.findIndex((item) => String(item) === String(over.id))

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    onChange?.(arrayMove(value, oldIndex, newIndex), [])
  }

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <DndContext
      collisionDetection={ closestCenter }
      onDragEnd={ handleDragEnd }
      sensors={ sensors }
    >
      <SortableContext
        items={ Array.isArray(value) ? value.map((item) => String(item)) : [] }
        strategy={ rectSortingStrategy }
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
