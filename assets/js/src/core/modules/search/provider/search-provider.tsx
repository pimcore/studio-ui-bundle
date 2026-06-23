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

export interface SearchContextData {
  activeKey: string
  setActiveKey: (key: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  /** A saved search whose state should be applied to the matching typed tab once it mounts. */
  pendingRestore: SavedSearchDetailedConfiguration | undefined
  setPendingRestore: (configuration: SavedSearchDetailedConfiguration | undefined) => void
}

export type SearchContextProps = SearchContextData | undefined

export const SearchContext = createContext<SearchContextProps>(undefined)

export interface SearchProviderProps {
  children: React.ReactNode
}

export const SearchProvider = (props: SearchProviderProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [activeKey, setActiveKey] = useState('all')
  const [pendingRestore, setPendingRestore] = useState<SavedSearchDetailedConfiguration | undefined>(undefined)

  return useMemo(() => (
    <SearchContext.Provider value={ { open, setOpen, activeKey, setActiveKey, pendingRestore, setPendingRestore } }>
      { props.children }
    </SearchContext.Provider>
  ), [open, activeKey, pendingRestore])
}
