/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RefObject, useEffect, useRef } from 'react'

/**
 * Scrolls the returned sentinel ref into view whenever `items` grows by
 * appending to the end (e.g. a column was added). Reorders, removals and
 * wholesale replacements (such as loading a saved configuration) are ignored,
 * so the list only auto-scrolls in response to an explicit add.
 *
 * Attach the ref to an element rendered after the list; `scrollIntoView` walks
 * up to the nearest scrollable ancestor, so it works regardless of which
 * container actually scrolls.
 */
export const useScrollIntoViewOnAppend = <T>(
  items: T[],
  getKey: (item: T, index: number) => string
): RefObject<HTMLDivElement> => {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const previousKeysRef = useRef<string[]>([])

  useEffect(() => {
    const previousKeys = previousKeysRef.current
    const currentKeys = items.map(getKey)

    const isAppend = currentKeys.length > previousKeys.length &&
      previousKeys.every((key, index) => key === currentKeys[index])

    if (isAppend) {
      sentinelRef.current?.scrollIntoView?.({ block: 'end', behavior: 'smooth' })
    }

    previousKeysRef.current = currentKeys
  }, [items])

  return sentinelRef
}
