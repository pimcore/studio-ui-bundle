/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import { type SavedSearchDetailedConfiguration } from '../search-api-slice.gen'
import { FULLTEXT_SEARCH_MODE_ID } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-abstract'

export interface SearchContextData {
  activeKey: string
  setActiveKey: (key: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  /** The search term shared across all tabs, so switching tabs takes the typed term along. */
  searchTerm: string
  setSearchTerm: (term: string) => void
  /** The search mode shared across tabs (id of a registered mode, or the full-text id). */
  searchMode: string
  setSearchMode: (mode: string) => void
  /** A saved search whose state should be applied to the matching typed tab once it mounts. */
  pendingRestore: SavedSearchDetailedConfiguration | undefined
  setPendingRestore: (configuration: SavedSearchDetailedConfiguration | undefined) => void
  /** The saved search currently loaded into a typed tab (drives the Save panel's update/clone state). */
  loadedSavedSearch: SavedSearchDetailedConfiguration | undefined
  setLoadedSavedSearch: (configuration: SavedSearchDetailedConfiguration | undefined) => void
}

export type SearchContextProps = SearchContextData | undefined

export const SearchContext = createContext<SearchContextProps>(undefined)

export interface SearchProviderProps {
  children: React.ReactNode
  /** Seed the restore/loaded state — used when hosting a search listing as a main-area widget. */
  initialPendingRestore?: SavedSearchDetailedConfiguration
  initialLoadedSavedSearch?: SavedSearchDetailedConfiguration
}

export const SearchProvider = (props: SearchProviderProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [activeKey, setActiveKey] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchMode, setSearchMode] = useState<string>(FULLTEXT_SEARCH_MODE_ID)
  const [pendingRestore, setPendingRestore] = useState<SavedSearchDetailedConfiguration | undefined>(props.initialPendingRestore)
  const [loadedSavedSearch, setLoadedSavedSearch] = useState<SavedSearchDetailedConfiguration | undefined>(props.initialLoadedSavedSearch)

  return useMemo(() => (
    <SearchContext.Provider value={ { open, setOpen, activeKey, setActiveKey, searchTerm, setSearchTerm, searchMode, setSearchMode, pendingRestore, setPendingRestore, loadedSavedSearch, setLoadedSavedSearch } }>
      { props.children }
    </SearchContext.Provider>
  ), [open, activeKey, searchTerm, searchMode, pendingRestore, loadedSavedSearch])
}
