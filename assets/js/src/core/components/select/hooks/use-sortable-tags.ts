/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export interface UseSortableTagsResult {
  sensors: ReturnType<typeof useSensors>
  handleTagDragEnd: (event: DragEndEvent) => void
}

export const useSortableTags = (value: unknown, onChange?: (value: any, option: any) => void): UseSortableTagsResult => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleTagDragEnd = (event: DragEndEvent): void => {
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

  return { sensors, handleTagDragEnd }
}
