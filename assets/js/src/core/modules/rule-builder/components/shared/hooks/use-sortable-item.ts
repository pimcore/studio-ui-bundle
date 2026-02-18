/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { CSSProperties } from 'react'

export interface UseSortableItemOptions {
  disabled?: boolean
}

export interface UseSortableItemReturn {
  attributes: ReturnType<typeof useSortable>['attributes']
  listeners: ReturnType<typeof useSortable>['listeners']
  setNodeRef: ReturnType<typeof useSortable>['setNodeRef']
  style: CSSProperties
}

export function useSortableItem (id: string, options?: UseSortableItemOptions): UseSortableItemReturn {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    disabled: options?.disabled
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: options?.disabled === true ? 'default' : 'grab'
  }

  return {
    attributes,
    listeners,
    setNodeRef,
    style
  }
}
