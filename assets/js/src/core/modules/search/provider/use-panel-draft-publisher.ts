/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useRef } from 'react'
import { isUndefined } from 'lodash'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type SavedSearchPanelDraft } from './search-provider'
import { useSearch } from './use-search'

/**
 * Publishes a Save panel's live values as the search's panel draft. The draft is always the shown
 * panel's: the search modal mounts its tabs only while open, and there the selected tab's panel is
 * shown — the others stay mounted and hold their values back until their tab is selected again.
 * Anywhere else the modal never opens and the panel is the only one. On unmount the panel takes
 * its draft back while it is still the draft.
 */
export const usePanelDraftPublisher = (elementType?: ElementType): ((draft: SavedSearchPanelDraft) => void) => {
  const { setPanelDraft, isOpen, activeKey } = useSearch()
  const shown = !isOpen || activeKey === elementType
  const shownRef = useRef(shown)
  shownRef.current = shown
  const latest = useRef<SavedSearchPanelDraft | undefined>(undefined)
  const published = useRef<SavedSearchPanelDraft | undefined>(undefined)

  // becoming the shown panel makes its values the draft, whatever another panel published meanwhile
  useEffect(() => {
    if (shown && !isUndefined(latest.current)) {
      published.current = latest.current
      setPanelDraft(latest.current)
    }
  }, [shown])

  useEffect(() => () => {
    const mine = published.current
    if (!isUndefined(mine)) {
      setPanelDraft((current) => (current === mine ? undefined : current))
    }
  }, [])

  return useCallback((draft: SavedSearchPanelDraft) => {
    latest.current = draft
    if (shownRef.current) {
      published.current = draft
      setPanelDraft(draft)
    }
  }, [setPanelDraft])
}
