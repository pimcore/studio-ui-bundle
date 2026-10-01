/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { type SavedSearchDetailedConfiguration } from '../search-api-slice.gen'
import { FULLTEXT_SEARCH_MODE_ID } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-abstract'

/** The Save panel's live values as the user edits them: its form fields and who the search is shared with. */
export interface SavedSearchPanelDraft {
  name: string
  description?: string
  createMenuShortcut?: boolean
  menuShortcutGroup?: string
  shareGlobally?: boolean
  sharedUsers: number[]
  sharedRoles: number[]
}

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
  /** The Save panel's live form values (name, description, shortcut, sharing) as the user edits them. */
  panelDraft: SavedSearchPanelDraft | undefined
  setPanelDraft: Dispatch<SetStateAction<SavedSearchPanelDraft | undefined>>
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
  const [panelDraft, setPanelDraft] = useState<SavedSearchPanelDraft | undefined>(undefined)

  // the value is memoized, not the element: a host may swap the children while the state holds
  const value = useMemo(
    () => ({ open, setOpen, activeKey, setActiveKey, searchTerm, setSearchTerm, searchMode, setSearchMode, pendingRestore, setPendingRestore, loadedSavedSearch, setLoadedSavedSearch, panelDraft, setPanelDraft }),
    [open, activeKey, searchTerm, searchMode, pendingRestore, loadedSavedSearch, panelDraft]
  )

  return (
    <SearchContext.Provider value={ value }>
      { props.children }
    </SearchContext.Provider>
  )
}
