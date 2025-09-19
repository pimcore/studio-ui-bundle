/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useMemo } from 'react'

export interface IUseShowMoreReturn<T> {
  isExpanded: boolean
  visibleItems: T[]
  toggle: () => void
  initialVisibleCount: number
}

const INITIAL_VISIBLE_COUNT = 5

export const useShowMore = <T,>(items: T[] = []): IUseShowMoreReturn<T> => {
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleItems = useMemo(() => {
    return isExpanded ? items : items?.slice(0, INITIAL_VISIBLE_COUNT)
  }, [isExpanded, items])

  const toggle = (): void => { setIsExpanded(!isExpanded) }

  return { isExpanded, visibleItems, toggle, initialVisibleCount: INITIAL_VISIBLE_COUNT }
}
