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

export interface SearchContextData {
  open: boolean
  setOpen: (open: boolean) => void
}

export type SearchContextProps = SearchContextData | undefined

export const SearchContext = createContext<SearchContextProps>(undefined)

export interface SearchProviderProps {
  children: React.ReactNode
}

export const SearchProvider = (props: SearchProviderProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  return useMemo(() => (
    <SearchContext.Provider value={ { open, setOpen } }>
      { props.children }
    </SearchContext.Provider>
  ), [open])
}
