/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, type Dispatch, type SetStateAction } from 'react'
import { SearchContext, type SavedSearchPanelDraft } from './search-provider'
import { type SavedSearchDetailedConfiguration } from '../search-api-slice.gen'
import { FULLTEXT_SEARCH_MODE_ID } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-abstract'

export interface UseSearchReturn {
  activeKey: string
  setActiveKey: (key: string) => void
  isOpen: boolean
  open: (key?: string) => void
  close: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchMode: string
  setSearchMode: (mode: string) => void
  pendingRestore: SavedSearchDetailedConfiguration | undefined
  setPendingRestore: (configuration: SavedSearchDetailedConfiguration | undefined) => void
  loadedSavedSearch: SavedSearchDetailedConfiguration | undefined
  setLoadedSavedSearch: (configuration: SavedSearchDetailedConfiguration | undefined) => void
  panelDraft: SavedSearchPanelDraft | undefined
  setPanelDraft: Dispatch<SetStateAction<SavedSearchPanelDraft | undefined>>
}

export const useSearch = (): UseSearchReturn => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  const open: UseSearchReturn['open'] = (key?: string) => {
    if (key !== undefined) {
      context.setActiveKey(key)
    }
    context.setOpen(true)
  }

  const close: UseSearchReturn['close'] = () => {
    context.setOpen(false)
    context.setSearchTerm('')
    context.setSearchMode(FULLTEXT_SEARCH_MODE_ID)
  }

  return {
    activeKey: context.activeKey,
    setActiveKey: context.setActiveKey,
    isOpen: context.open,
    open,
    close,
    searchTerm: context.searchTerm,
    setSearchTerm: context.setSearchTerm,
    searchMode: context.searchMode,
    setSearchMode: context.setSearchMode,
    pendingRestore: context.pendingRestore,
    setPendingRestore: context.setPendingRestore,
    loadedSavedSearch: context.loadedSavedSearch,
    setLoadedSavedSearch: context.setLoadedSavedSearch,
    panelDraft: context.panelDraft,
    setPanelDraft: context.setPanelDraft
  }
}

/**
 * The saved search still being restored, or undefined when none is — and when there is no
 * SearchProvider at all, as in the element selectors that reuse the search listings outside the
 * Quick Search modal. Use this instead of useSearch where the provider is optional.
 */
export const usePendingRestore = (): SavedSearchDetailedConfiguration | undefined => {
  return useContext(SearchContext)?.pendingRestore
}
