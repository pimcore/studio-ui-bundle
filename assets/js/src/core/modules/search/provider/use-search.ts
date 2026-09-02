/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { SearchContext, type SearchContextData } from './search-provider'
import { type SavedSearchDetailedConfiguration } from '../search-api-slice.gen'

export interface UseSearchReturn {
  activeKey: string
  setActiveKey: (key: string) => void
  isOpen: boolean
  open: (key?: string) => void
  close: () => void
  pendingRestore: SavedSearchDetailedConfiguration | undefined
  setPendingRestore: (configuration: SavedSearchDetailedConfiguration | undefined) => void
  loadedSavedSearch: SavedSearchDetailedConfiguration | undefined
  setLoadedSavedSearch: (configuration: SavedSearchDetailedConfiguration | undefined) => void
}

const createSearchApi = (context: SearchContextData): UseSearchReturn => {
  const open: UseSearchReturn['open'] = (key?: string) => {
    if (key !== undefined) {
      context.setActiveKey(key)
    }
    context.setOpen(true)
  }

  const close: UseSearchReturn['close'] = () => {
    context.setOpen(false)
  }

  return {
    activeKey: context.activeKey,
    setActiveKey: context.setActiveKey,
    isOpen: context.open,
    open,
    close,
    pendingRestore: context.pendingRestore,
    setPendingRestore: context.setPendingRestore,
    loadedSavedSearch: context.loadedSavedSearch,
    setLoadedSavedSearch: context.setLoadedSavedSearch
  }
}

export const useSearch = (): UseSearchReturn => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return createSearchApi(context)
}

/**
 * Same as useSearch, but returns undefined instead of throwing when there is no SearchProvider
 * above. Use it in generic components that may be rendered either inside or outside the search.
 */
export const useSearchOptional = (): UseSearchReturn | undefined => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    return undefined
  }

  return createSearchApi(context)
}
