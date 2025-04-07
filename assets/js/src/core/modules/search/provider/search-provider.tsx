/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
