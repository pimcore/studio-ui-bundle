/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, type SensorDescriptor, type SensorOptions, type Modifier, type CollisionDetection } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, verticalListSortingStrategy, type SortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export interface UseRuleItemDragDropReturn {
  sensors: Array<SensorDescriptor<SensorOptions>>
  modifiers: Modifier[]
  collisionDetection: CollisionDetection
  strategy: SortingStrategy
}

export function useRuleItemDragDrop (): UseRuleItemDragDropReturn {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const modifiers = [restrictToVerticalAxis]

  return {
    sensors,
    modifiers,
    collisionDetection: closestCenter,
    strategy: verticalListSortingStrategy
  }
}
