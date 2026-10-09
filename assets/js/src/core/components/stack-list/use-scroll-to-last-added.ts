/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef, type RefObject } from 'react'

export interface UseScrollToLastAddedOptions<T> {
  /** The list currently rendered by a `StackList`, in render order. */
  items: T[]
  /**
   * Returns a stable identity for an item. It must stay the same across re-renders of an item
   * that hasn't changed, and must never be reused across a wholesale reset/re-seed of the list
   * (e.g. a freshly generated id per re-seed) - that difference is what lets a genuine user
   * append be told apart from the list being replaced wholesale.
   */
  getItemId: (item: T) => string
}

const STACK_LIST_ITEM_SELECTOR = '.stack-list__item'

/**
 * Smoothly scrolls the last row of a `StackList`-rendered list into view, but only when the item
 * list just grew by a pure append: every previously rendered id is still present, in the same
 * order, with one or more new ids added at the end. Any other transition - the initial mount, a
 * wholesale reset/re-seed, a removal, a reorder, or an in-place edit that keeps the same ids in
 * the same order - is left alone.
 *
 * Returns a ref to attach to the element that directly wraps the `StackList`: its rendered
 * `.stack-list__item` rows are queried to find the newly added one. `scrollIntoView` is called
 * with `block: 'nearest'` so a row taller than the viewport (e.g. a freshly expanded advanced
 * column) still has its leading edge brought into view rather than being over-scrolled.
 *
 * Shared by `BaseColumnEditor`'s column list and Studio's own listing grid configuration
 * (`GridConfigList`).
 */
export const useScrollToLastAdded = <T>(
  { items, getItemId }: UseScrollToLastAddedOptions<T>
): RefObject<HTMLDivElement> => {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousIdsRef = useRef<string[]>([])
  const hasMountedRef = useRef(false)

  useEffect(() => {
    const currentIds = items.map(getItemId)
    const previousIds = previousIdsRef.current
    previousIdsRef.current = currentIds

    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    const isPureAppend = currentIds.length > previousIds.length &&
      previousIds.every((id, index) => id === currentIds[index])

    if (!isPureAppend) {
      return
    }

    // Two rAFs: the first waits out this render's commit (a freshly appended advanced column
    // mounts expanded), the second waits out the expand animation's own layout pass so the row's
    // final height is what gets measured.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rows = containerRef.current?.querySelectorAll<HTMLElement>(STACK_LIST_ITEM_SELECTOR)
        const lastRow = rows?.[rows.length - 1]
        lastRow?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      })
    })
  }, [items])

  return containerRef
}
