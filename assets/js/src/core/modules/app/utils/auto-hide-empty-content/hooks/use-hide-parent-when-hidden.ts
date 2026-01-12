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

    if (isHidden) {
      parent.style.display = 'none'
    }

    return () => {
      parent.style.display = ''
    }
  }, [parentSelector])

  return { ref }
}
