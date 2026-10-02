/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import { useCallback, useRef } from 'react'

const TREE_ITEM = '[role="treeitem"]'

/**
 * Roving tabindex for a WAI-ARIA tree: exactly one tree item is in the Tab order — the selected one while it is
 * rendered, else the first. Tree items render with tabIndex -1; the returned callback ref (for the role="tree"
 * container) keeps the one stop up to date as nodes mount, unmount or change selection. The items are read from
 * the DOM in document order, like the arrow-key navigation, so the stop never depends on render timing.
 */
export const useRovingTabStop = (): ((tree: HTMLElement | null) => void) => {
  const observer = useRef<MutationObserver | null>(null)

  return useCallback((tree: HTMLElement | null): void => {
    observer.current?.disconnect()
    observer.current = null
    if (tree === null) {
      return
    }

    const sync = (): void => {
      const items = Array.from(tree.querySelectorAll<HTMLElement>(TREE_ITEM))
      const stop = items.find((item) => item.getAttribute('aria-selected') === 'true') ?? items[0]
      items.forEach((item) => {
        const tabIndex = item === stop ? 0 : -1
        if (item.tabIndex !== tabIndex) {
          item.tabIndex = tabIndex
        }
      })
    }

    sync()
    observer.current = new MutationObserver(sync)
    observer.current.observe(tree, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-selected'] })
  }, [])
}
