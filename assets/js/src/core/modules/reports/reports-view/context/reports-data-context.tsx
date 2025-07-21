/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useState, type ReactNode, useMemo } from 'react'
import { isUndefined } from 'lodash'

interface IReportsDataContext {
  currentReport: string | null
  setCurrentReport: (currentReport: string) => void
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  resetPagination: () => void
}

const ReportsDataContext = createContext<IReportsDataContext | undefined>(undefined)

interface IReportsDataProviderProps {
  children: ReactNode
}

const PAGE_INITIAL = 1
const PAGE_SIZE_INITIAL = 10

export const ReportsDataProvider = ({ children }: IReportsDataProviderProps): React.JSX.Element => {
  const [currentReport, setCurrentReport] = useState<string | null>(null)

  const [page, setPage] = useState(PAGE_INITIAL)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_INITIAL)

  const resetPagination = (): void => {
    setPage(PAGE_INITIAL)
    setPageSize(PAGE_SIZE_INITIAL)
  }

  const contextValue = useMemo(() => ({
    currentReport,
    setCurrentReport,
    page,
    setPage,
    pageSize,
    setPageSize,
    resetPagination
  }), [currentReport, setCurrentReport, page, setPage, pageSize, setPageSize])

  return (
    <ReportsDataContext.Provider value={ contextValue }>
      {children}
    </ReportsDataContext.Provider>
  )
}

export const useReportsDataContext = (): IReportsDataContext => {
  const context = useContext(ReportsDataContext)

  if (isUndefined(context)) {
    throw new Error('useReportsDataContext must be used within a ReportsDataProvider')
  }

  return context
}
