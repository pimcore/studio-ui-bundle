/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { useDraggable } from '@dnd-kit/core'

export interface UseSortableElementProps {
  id: string
  element: HTMLElement
}

export interface UseSortableElementReturn {
  listeners: ReturnType<typeof useDraggable>['listeners']
}

/**
 * Sets up the toolbar element as a drag source. Uses `useDraggable` rather than
 * `useSortable` because the toolbars don't move during a drag (they're portaled
 * into static pimcore HTML) and the user only drops on dropzones.
 */
export const useSortableElement = ({
  id,
  element
}: UseSortableElementProps): UseSortableElementReturn => {
  const {
    attributes,
    listeners,
    setNodeRef
  } = useDraggable({ id })

  // dnd-kit returns a fresh `attributes` object every drag tick — dedup writes
  // against the last-applied values to keep the per-tick effect a no-op.
  const lastAttributesRef = useRef<Record<string, string>>({})

  React.useEffect(() => {
    if (setNodeRef === null) return

    setNodeRef(element)

    const lastAttributes = lastAttributesRef.current
    Object.keys(attributes).forEach(key => {
      if (attributes[key] === undefined || !key.startsWith('data-')) return
      const nextValue = String(attributes[key])
      if (lastAttributes[key] === nextValue) return
      element.setAttribute(key, nextValue)
      lastAttributes[key] = nextValue
    })
  }, [setNodeRef, element, attributes])

  return {
    listeners
  }
}
