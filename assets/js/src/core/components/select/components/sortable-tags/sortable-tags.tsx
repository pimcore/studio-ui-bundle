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
import { isNull } from 'lodash'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, type DragEndEvent, useSensor, useSensors } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { SelectProps } from 'antd'
import { getSortableTagIds, reorderTags } from './reorder-tags'

export interface SortableTagsProps {
  enabled: boolean
  disabled?: boolean
  value: unknown
  options?: SelectProps['options']
  onChange?: SelectProps['onChange']
  children: React.ReactNode
}

export const SortableTags = ({ enabled, disabled = false, value, options, onChange, children }: SortableTagsProps): React.JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    if (disabled || isNull(over)) {
      return
    }

    const reordered = reorderTags(value, active.id, over.id, options)

    if (!isNull(reordered)) {
      onChange?.(reordered.value, reordered.options)
    }
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
        disabled={ disabled }
        items={ getSortableTagIds(value) }
        strategy={ rectSortingStrategy }
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
