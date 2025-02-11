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

export interface PagingData {
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export type PagingContextProps = PagingData | undefined

export const PagingContext = createContext<PagingContextProps>(undefined)

export const PagingProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  return useMemo(() => (
    <PagingContext.Provider value={ { page, setPage, pageSize, setPageSize } }>
      { children }
    </PagingContext.Provider>
  ), [page, pageSize])
}
