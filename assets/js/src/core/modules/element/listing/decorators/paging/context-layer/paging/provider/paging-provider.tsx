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
