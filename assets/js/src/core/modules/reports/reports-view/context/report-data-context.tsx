/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode, useState, useMemo } from 'react'
import { isUndefined } from 'lodash'
import { useReportData, type IUseReportDataReturn } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'

interface IReportDataProviderProps {
  name: string
  children: ReactNode
}

interface IReportDataContext extends IUseReportDataReturn {
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export const PAGE_INITIAL = 1
export const PAGE_SIZE_INITIAL = 50

const ReportDataContext = createContext<IReportDataContext | undefined>(undefined)

export const ReportDataProvider = ({
  name,
  children
}: IReportDataProviderProps): React.JSX.Element => {
  const [page, setPage] = useState(PAGE_INITIAL)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_INITIAL)

  const { filters } = useGridFilterContext()

  const reportDataValue = useReportData({ name, filters, page, pageSize })

  const contextValue: IReportDataContext = useMemo(() => ({
    ...reportDataValue,
    page,
    setPage,
    pageSize,
    setPageSize
  }), [reportDataValue, page, setPage, pageSize, setPageSize])

  return (
    <ReportDataContext.Provider value={ contextValue }>
      {children}
    </ReportDataContext.Provider>
  )
}

export const useReportDataContext = (): IReportDataContext => {
  const context = useContext(ReportDataContext)

  if (isUndefined(context)) {
    throw new Error('useReportDataContext must be used within a ReportDataProvider')
  }

  return context
}
