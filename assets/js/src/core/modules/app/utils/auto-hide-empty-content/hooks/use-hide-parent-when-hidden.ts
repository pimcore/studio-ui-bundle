/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { isNil } from 'lodash'

interface UseHideParentWhenHiddenOptions {
  parentSelector?: string
}

interface UseHideParentWhenHiddenResult<T extends HTMLElement> {
  ref: React.RefObject<T>
}

export function useHideParentWhenHidden<T extends HTMLElement = HTMLDivElement> (
  options: UseHideParentWhenHiddenOptions
): UseHideParentWhenHiddenResult<T> {
  const { parentSelector } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    if (isNil(parentSelector)) return

    const element = ref.current
    if (isNil(element)) return

    const parent = element.closest<HTMLElement>(parentSelector)
    if (isNil(parent)) return

    const computedStyle = window.getComputedStyle(element)
    const isHidden = computedStyle.display === 'none'

    if (!isHidden) {
      return
    }

    // The boundary's inline display may already be owned by whoever rendered it
    // — a layout container hides the wrapper of an invisible field that way.
    // Restoring '' would clobber that, and React does not re-apply a style it
    // still believes is set, so the field would come back visible. Put back
    // exactly what was there instead, and only when we actually wrote.
    const previousDisplay = parent.style.display
    parent.style.display = 'none'

    return () => {
      parent.style.display = previousDisplay
    }
  }, [parentSelector])

  return { ref }
}
