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
import { type SavedSearchPanelDraft } from './search-provider'
import { useSearch } from './use-search'

/**
 * Publishes a Save panel's live values as the search's panel draft, and takes them back when the
 * panel unmounts — but only while they are still the draft: another mounted panel may have
 * published since, and its values must not go with this one.
 */
export const usePanelDraftPublisher = (): ((draft: SavedSearchPanelDraft) => void) => {
  const { setPanelDraft } = useSearch()
  const published = useRef<SavedSearchPanelDraft | undefined>(undefined)

  useEffect(() => () => {
    const mine = published.current
    if (mine !== undefined) {
      setPanelDraft((current) => (current === mine ? undefined : current))
    }
  }, [])

  return useCallback((draft: SavedSearchPanelDraft) => {
    published.current = draft
    setPanelDraft(draft)
  }, [setPanelDraft])
}
