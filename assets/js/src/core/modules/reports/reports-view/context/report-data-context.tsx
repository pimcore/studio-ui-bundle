/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode } from 'react'
import { isUndefined } from 'lodash'
import { useReportData, type IUseReportDataReturn } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'

interface IReportDataProviderProps {
  name: string
  page: number
  pageSize: number
  children: ReactNode
}

const ReportDataContext = createContext<IUseReportDataReturn | undefined>(undefined)

export const ReportDataProvider = ({
  name,
  page,
  pageSize,
  children
}: IReportDataProviderProps): React.JSX.Element => {
  const { filters } = useGridFilterContext()

  const value = useReportData({ name, filters, page, pageSize })

  return (
    <ReportDataContext.Provider value={ value }>
      {children}
    </ReportDataContext.Provider>
  )
}

export const useReportDataContext = (): IUseReportDataReturn => {
  const context = useContext(ReportDataContext)

  if (isUndefined(context)) {
    throw new Error('useReportDataContext must be used within a ReportDataProvider')
  }

  return context
}
