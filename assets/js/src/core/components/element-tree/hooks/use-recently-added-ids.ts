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
import { isEmpty, isNull } from 'lodash'
import { useTemporaryValue } from '@Pimcore/utils/hooks/use-temporary-value'

/** How long a newly added node stays highlighted, in ms. */
export const recentlyAddedHighlightDuration = 1600

/** More new nodes at once are a reload rather than something the user just added. */
const maxHighlightedNodes = 10

const noIds = new Set<string>()

/**
 * Detects children that appear in an already loaded list, e.g. after creating or pasting an
 * element, so they can be highlighted briefly. Loading a list for the first time, paging and
 * searching replace the children and highlight nothing.
 */
export const useRecentlyAddedIds = (childrenIds: string[], { isLoading, listKey }: { isLoading: boolean, listKey: string }): Set<string> => {
  const knownIdsRef = useRef<Set<string> | null>(null)
  const listKeyRef = useRef(listKey)
  const [recentlyAddedIds, showRecentlyAddedIds] = useTemporaryValue<Set<string>>(recentlyAddedHighlightDuration)
  const idsKey = childrenIds.join(',')

  useEffect(() => {
    if (isLoading) {
      return
    }

    const knownIds = knownIdsRef.current
    const isSameList = listKeyRef.current === listKey

    if (!isNull(knownIds) && isSameList) {
      const addedIds = childrenIds.filter((id) => !knownIds.has(id))

      if (!isEmpty(addedIds) && addedIds.length <= maxHighlightedNodes) {
        showRecentlyAddedIds(new Set(addedIds))
      }
    }

    knownIdsRef.current = new Set(childrenIds)
    listKeyRef.current = listKey
  }, [idsKey, isLoading, listKey])

  return recentlyAddedIds ?? noIds
}
