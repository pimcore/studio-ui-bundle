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
 * searching replace the children and highlight nothing: after such a change, the children only
 * become the new baseline once the new ones have arrived (they differ, or a loading has finished).
 */
export const useRecentlyAddedIds = (childrenIds: string[], { isLoading, listKey }: { isLoading: boolean, listKey: string }): Set<string> => {
  const stateRef = useRef<{ knownIds: Set<string> | null, listKey: string, staleIdsKey: string, hasLoaded: boolean }>({
    knownIds: null,
    listKey,
    staleIdsKey: '',
    hasLoaded: false
  })
  const [recentlyAddedIds, showRecentlyAddedIds, clearRecentlyAddedIds] = useTemporaryValue<Set<string>>(recentlyAddedHighlightDuration)
  const idsKey = childrenIds.join(',')

  useEffect(() => {
    const state = stateRef.current

    if (state.listKey !== listKey) {
      // another page or search: forget the current children and any highlight
      stateRef.current = { knownIds: null, listKey, staleIdsKey: idsKey, hasLoaded: false }
      clearRecentlyAddedIds()
    }

    const current = stateRef.current

    if (isLoading) {
      current.hasLoaded = true
      return
    }

    if (isNull(current.knownIds)) {
      // wait for the children of this list before taking them as baseline
      if (!current.hasLoaded && idsKey === current.staleIdsKey) {
        return
      }

      current.knownIds = new Set(childrenIds)
      return
    }

    const knownIds = current.knownIds
    const addedIds = childrenIds.filter((id) => !knownIds.has(id))

    if (!isEmpty(addedIds) && addedIds.length <= maxHighlightedNodes) {
      showRecentlyAddedIds(new Set(addedIds))
    }

    current.knownIds = new Set(childrenIds)
  }, [idsKey, isLoading, listKey])

  return recentlyAddedIds ?? noIds
}
