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
}

const ReportsDataContext = createContext<IReportsDataContext | undefined>(undefined)

interface IReportsDataProviderProps {
  children: ReactNode
}

export const ReportsDataProvider = ({ children }: IReportsDataProviderProps): React.JSX.Element => {
  const [currentReport, setCurrentReport] = useState<string | null>(null)

  const contextValue = useMemo(() => ({
    currentReport,
    setCurrentReport
  }), [currentReport, setCurrentReport])

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
